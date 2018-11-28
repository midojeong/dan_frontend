import axios from "axios";
import { getAPI } from "./env";
import { ID } from "./CommonType";

type ATTRIBUTE = "name"
  | "phone"
  | "age"
  | "discount"
  | "discountReason"
  | "detail"
  | "visible";

const api = `${getAPI()}/student`;

type StudentPayload = {
  name: string;
  phone?: string;
  age?: number;
  discount?: number;
  discountReason?: string;
  detail?: string;
  visible?: boolean;
}

// C
export const createStudent = async (payload: StudentPayload) => {
  try {
    const res = await axios.post(`${api}/create`, payload);
    return res.data.result;
  } catch (err) {
    // TODO
  }
}

// R
export const getStudents = async () => {
  try {
    const res = await axios.get(`${api}/get`);
    return res.data.result;
  } catch (err) {
    return [];
  }
}

export const getStudent = async (id: ID) => {
  try {
    const res = await axios.get(`${api}/${id}`);
    return res.data.result;
  } catch (err) {
    return {}
  }
}

export const getStudentSessions = async (id: ID) => {
  try {
    const res = await axios.get(`${api}/get/sessions/${id}`);
    return res.data.result;
  } catch (err) {
    // TODO
  }
}

export const getStudentInvoices = async (id: ID) => {
  try {
    const res = await axios.get(`${api}/get/invoices/${id}`);
    return res.data.result;
  } catch (err) {
    // TODO
  }
}

export const getStudentCourses = async (id: ID) => {
  try {
    const res = await axios.get(`${api}/get/courses/${id}`);
    return res.data.result;
  } catch (err) {
    // TODO
  }
}

export const getStudentExtramoney = async (id: ID) => {
  try {
    const res = await axios.get(`${api}/get/extramoney/${id}`);
    return res.data.result;
  } catch (err) {
    // TODO
  }
}

// U
export const updateStudent = async (id: ID, attr: ATTRIBUTE, value: any) => await axios.post(`${api}/update/${attr}/${id}`, { [attr]: value });

// D
export const deleteStudent = async (id: ID) => {
  try {
    const res = await axios.delete(`${api}/delete/${id}`);
    return res.data.result;
  } catch (error) {
    // TODO
  }
}
