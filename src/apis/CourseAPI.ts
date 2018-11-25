import axios from "axios";
import { getAPI } from "./env";
import { ID } from "./CommonType";
import { Course } from "../models/Course";

type ATTRIBUTE = "name" | "detail" | "contract" | "contractType" | "visible";
const api = `${getAPI()}/course`;

type CoursePayload = {
  name: string;
  price?: number;
  detail?: string;
  contract?: number;
  contractType?: string;
  visible?: boolean;
  teacher?: ID;
}

type TeacherPayload = {
  teacher: ID;
  contract?: number;
  contractType?: string;
}

type SchedulePayload = {
  mode: "update" | "create" | "delete";
  from?: ID;
  to?: {
    date?: string;
    time?: string;
  }
}

export const createCourse = async (payload: CoursePayload) => {
  try {
    const res = await axios.post(`${api}/create`, payload);
    return res.data.result;
  } catch (err) {
    // TODO
  }
}

export const getCourses = async () => {
  try {
    const res = await axios.get(`${api}/get`);
    return res.data.result;
  } catch (err) {
    return [];
  }
}

export const getCourse = async (id: ID) => {
  try {
    const res = await axios.get(`${api}/${id}`)
    return res.data.result;
  } catch (err) {
    return {};
  }
}

export const getCourseStudents = async (id: ID) => {
  try {
    const res = await axios.get(`${api}/get/students/${id}`);
    return res.data.result;
  } catch (err) {
    return [];
  }
}

export const getCourseSchedules = async (id: ID) => {
  try {
    const res = await axios.get(`${api}/get/schedules/${id}`);
    return res.data.result;
  } catch (err) {
    return [];
  }
}

export const updateCourseTeacher = async (id: ID, payload: TeacherPayload) => await axios.post(`${api}/update/teacher/${id}`, payload);
export const updateCourseSchedule = async (id: ID, payload: SchedulePayload) => await axios.post(`${api}/update/schedule/${id}`, payload);
export const updateCoursePrice = async (id: ID, payload: { price: number }) => await axios.post(`${api}/update/price/${id}`, payload);
export const updateCourse = async (id: ID, attr: ATTRIBUTE, value: any) => await axios.post(`${api}/update/${attr}/${id}`, { [attr]: value });

export const deleteCourse = async (id: ID) => await axios.delete(`${api}/delete/${id}`);
export const deleteCourseTeacher = async (id: ID) => await axios.delete(`${api}/delete/teacher/${id}`);
