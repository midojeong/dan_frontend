import axios from "axios";
import { getAPI } from "./env";
import { ID } from "./CommonType";

const api = `${getAPI()}/enroll`;

export const enroll = async (payload: { course: ID, student: ID }) => await axios.post(`${api}/create`, payload);

export const unenroll = async (payload: { course: ID, student: ID }) => await axios({
  method: "delete",
  url: `${api}/delete`,
  data: payload,
});

export const updateEnrollDetail = async (id: ID, payload: { detail: string }) =>
  await axios.post(`${api}/update/detail/${id}`, payload);
