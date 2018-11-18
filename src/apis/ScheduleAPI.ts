import axios from "axios";
import { getAPI } from "./env";
import { ID } from "./CommonType";

const api = `${getAPI()}/schedule`;

export const getSchedules = async () => await axios.get(`${api}/get`);
export const getSchedule = async (id: ID) => await axios.get(`${api}/${id}`);
export const getScheduleSessions = async (id: ID) => await axios.get(`${api}/get/sessions/${id}`);

//deprecated
// export const updateSchedule = async (id: ID, attr: ATTRIBUTE, value: any) => await axios.get(`${api}/update/${attr}/${id}`, { [attr]: value });
