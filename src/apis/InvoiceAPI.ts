import axios from "axios";
import { getAPI } from "./env";
import { ID } from "./CommonType";

type ATTRIBUTE = "amount"
  | "cash"
  | "card"
  | "transfer"
  | "cardSettled"
  | "transferSettled"
  | "published"
  | "publishedAt"
  | "settled"
  | "settledAt"
  | "visible"
  | "detail";
const api = `${getAPI()}/invoice`;

type InvoicePayload = {
  sessions: any;
  extras: any;
  student: any;
  cash?: number;
  card?: number;
  transfer?: number;
  detail?: string;
}

export const createInvoice = async (payload: InvoicePayload) => await axios.post(`${api}/create`, payload);

export const getInvoices = async () => {
  try {
    const res = await axios.get(`${api}/get`);
    return res.data.result;
  } catch (error) {
    return [];
  }
}
export const getInvoice = async (id: ID) => {
  try {
    const res = await axios.get(`${api}/${id}`);
    return res.data.result;
  } catch (error) {
    return {};
  }
}
export const getInvoiceReport = async (id: ID) => {
  try {
    const res = await axios.get(`${api}/report/${id}`);
    return res.data.result;
  } catch (error) {
    return [];
  }
}

export const updateInvoice = async (id: ID, attr: ATTRIBUTE, value: any) => await axios.post(`${api}/update/${attr}/${id}`, { [attr]: value });

export const deleteInvoice = async (id: ID) => {
  try {
    const res = await axios.delete(`${api}/delete/${id}`);
    return res.data.result;
  } catch (error) {
    return {};
  }
}
