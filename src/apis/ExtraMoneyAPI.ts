import axios from "axios";
import { getAPI } from "./env";
import { ID } from "./CommonType";

type ATTRIBUTE = "amount" | "detail" | "active";
const api = `${getAPI()}/extramoney`;

type ExtraPayload = {
  student: ID;
  invoice?: ID;
  amount: number;
  detail?: number;
  active?: boolean;
}

export const createExtra = async (payload: ExtraPayload) => await axios.post(`${api}/create`, payload);

export const getExtras = async () => await axios.get(`${api}/get`);
export const getExtra = async (id: ID) => await axios.get(`${api}/${id}`);

export const updateExtraStudent = async (id: ID, payload: { student: ID }) => await axios.post(`${api}/update/student/${id}`, payload);
export const updateExtraInvoice = async (id: ID, payload: { invoice: ID }) => await axios.post(`${api}/update/invoice/${id}`, payload);
export const updateExtra = async (id: ID, attr: ATTRIBUTE, value: any) => await axios.post(`${api}/update/${attr}/${id}`, { [attr]: value });

export const deleteExtra = async (id: ID) => await axios.delete(`${api}/delete/${id}`);
