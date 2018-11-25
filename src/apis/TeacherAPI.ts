import axios from "axios";
import { getAPI } from "./env";
import { ID } from "./CommonType";

type ATTRIBUTE = "name" | "phone" | "detail" | "contract" | "contractType" | "visible";
const api = `${getAPI()}/teacher`;

type TeacherPayload = {
  name: string;
  phone?: number;
  detail?: string;
  contract?: number;
  contractType?: string;
  visible?: boolean;
}


export const createTeacher = async (payload: TeacherPayload) => await axios.post(`${api}/create`, payload);

export const getTeachers = async () => {
  try {
    const res = await axios.get(`${api}/get`);
    return res.data.result;
  } catch (error) {
    return [];
    // TODO
  }
}

export const getTeacher = async (id: ID) => await axios.get(`${api}/${id}`);

export const updateTeacher = async (id: ID, attr: ATTRIBUTE, value: any) => await axios.post(`${api}/update/${attr}/${id}`, { [attr]: value });

export const deleteTeacher = async (id: ID) => await axios.delete(`${api}/delete/${id}`);
