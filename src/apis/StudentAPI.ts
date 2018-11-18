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
export const createStudent = async (payload: StudentPayload) => await axios.post(`${api}/create`, payload);

// R
export const getStudents = async () => await axios.get(`${api}/get`);
export const getStudent = async (id: ID) => await axios.get(`${api}/${id}`);
export const getStudentSessions = async (id: ID) => await axios.get(`${api}/get/sessions/${id}`);
export const getStudentInvoices = async (id: ID) => await axios.get(`${api}/get/invoices/${id}`);
export const getStudentCourses = async (id: ID) => await axios.get(`${api}/get/courses/${id}`);
export const getStudentExtramoney = async (id: ID) => await axios.get(`${api}/get/extramoney/${id}`);

// U
export const updateStudent = async (id: ID, attr: ATTRIBUTE, value: any) => await axios.post(`${api}/update/${attr}/${id}`, { [attr]: value });

// D
export const deleteStudent = async (id: ID) => await axios.delete(`${api}/delete/${id}`);
