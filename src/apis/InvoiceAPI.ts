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
  sessions: [ID, string];
  student: ID;
  cash?: number;
  card?: number;
  transfer?: number;
  detail?: string;
}

export const createInvoice = async (payload: InvoicePayload) => await axios.post(`${api}/create`, payload);

export const getInvoices = async () => await axios.get(`${api}/get`);
export const getInvoice = async (id: ID) => await axios.get(`${api}/${id}`);
export const getInvoiceReport = async (id: ID) => await axios.get(`${api}/report/${id}`);

export const updateInvoice = async (id: ID, attr: ATTRIBUTE, value: any) => await axios.post(`${api}/update/${attr}/${id}`, { [attr]: value });

export const deleteInvoice = async (id: ID) => await axios.delete(`${api}/delete/${id}`);
