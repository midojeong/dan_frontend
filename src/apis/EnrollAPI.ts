import axios from "axios";
import { getAPI } from "./env";

const api = `${getAPI()}/enroll`;

export const enroll = async (payload: { course, student }) => {
  try {
    const res = await axios.post(`${api}/create`, payload);
    return res.data.result;
  } catch (error) {
    // TODO
    console.log(error);
    return {};
  }
}

export const unenroll = async (payload: { course, student }) => {
  try {
    const res = await axios({ method: "delete", url: `${api}/delete`, data: payload });
    return res.data.result;
  } catch (error) {
    // TODO
    return {};
  }
}

export const updateEnrollDetail = async (id, payload: { detail: string }) =>
  await axios.post(`${api}/update/detail/${id}`, payload);
