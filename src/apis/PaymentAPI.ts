import axios from "axios";
import { getAPI } from "./env";
import { ID } from "./CommonType";

type ATTRIBUTE = "amount" | "detail";
const api = `${getAPI()}/payment`;

export const getPayment = async (id: ID) => await axios.get(`${api}/${id}`);
export const updatePayment = async (id: ID, attr: ATTRIBUTE, value: any) => await axios.post(`${api}/update/${attr}/${id}`, { [attr]: value });
