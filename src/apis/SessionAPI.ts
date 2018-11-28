import axios from "axios";
import { getAPI } from "./env";
import { ID } from "./CommonType";

type ATTRIBUTE = "detail";
const api = `${getAPI()}/session`;

type DiscountPayload = {
  discount: number;
  discountReason?: string;
}

type BulkDiscountPayload = {
  sessions: ID[];
  discount: number;
  discountReason?: string;
}

export const getSessions = async () => {
  try {
    const res = await axios.get(`${api}/get`);
    return res.data.result;
  } catch (error) {
    return [];
  }
}
export const getSession = async (id: ID) => {
  try {
    const res = await axios.get(`${api}/${id}`);
    return res.data.result;
  } catch (error) {
    return {};
  }
}

export const updateSessionActive = async (id: ID, payload: { active: boolean }) => await axios.post(`${api}/update/active/${id}`, payload);
export const updateSessionDiscount = async (id: ID, payload: DiscountPayload) => await axios.post(`${api}/update/discount/${id}`, payload);
export const updateSessionDiscounts = async (payload: BulkDiscountPayload) => await axios.post(`${api}/update/discounts`, payload);
export const updateSessionAttendance = async (id: ID, payload: { attendance: number }) => await axios.post(`${api}/update/attendance/${id}`, payload);
export const updateSession = async (id: ID, attr: ATTRIBUTE, value: any) => await axios.post(`${api}/update/${attr}/${id}`, { [attr]: value });
