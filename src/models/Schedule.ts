import { Course } from "./Course";

export type Schedule = {
  id: number;
  time: number;
  date: string;
  dDay: boolean;
  course: number;
  Course: Course;
  detail: string;
  visible: boolean;
}
