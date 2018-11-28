import axios from "axios";
import { getAPI } from "./env";
import { ID } from "./CommonType";

const api = `${getAPI()}/schedule`;

export const getSchedules = async () => {
  try {
    const res = await axios.get(`${api}/get`);
    return res.data.result;
  } catch (error) {
    return [];
  }
}
export const getSchedule = async (id: ID) => {
  try {
    const res = await axios.get(`${api}/${id}`);
    return res.data.result;
  } catch (error) {
    return {};
  }
}
export const getScheduleSessions = async (id: ID) => {
  try {
    const res = await axios.get(`${api}/get/sessions/${id}`);
    return res.data.result;
  } catch (error) {
    return [];
  }
}

//deprecated
// export const updateSchedule = async (id: ID, attr: ATTRIBUTE, value: any) => await axios.get(`${api}/update/${attr}/${id}`, { [attr]: value });
