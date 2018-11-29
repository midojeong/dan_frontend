import React from "react";
import { List, Main } from "../components";
import {
  CourseTable,
  CourseOverview,
  CourseSchedule,
} from "../components/CourseComponents";
import { Route } from "react-router-dom";
import {
  createCourse,

  getCourse,
  getCourses,
  getCourseStudents,
  getCourseSchedules,

  updateCourse,
  updateCoursePrice,
  updateCourseTeacher,
  updateCourseSchedule,

  deleteCourse,
  deleteCourseTeacher,
} from "../apis/CourseAPI";
import {
  getScheduleSessions,
} from "../apis/ScheduleAPI";
import {
  enroll,
  unenroll,
} from "../apis/EnrollAPI";

export class CoursePage extends React.Component<any> {

  state = {
    course: {},
    courses: [],
    students: [],
    schedule: {},
    schedules: [],
    sessions: [],
  }

  createCourse = async (payload) => {
    const data = await createCourse(payload);
    await this.fetchCourses();
    this.props.history.push(`/course/${data.id}/overview`);
  }

  fetchCourses = async () => {
    const data = await getCourses();
    this.setState({ courses: data });
  }

  fetchCourse = async (id: any) => {
    const data = await getCourse(id);
    this.setState({ course: data });
  }

  fetchStudents = async (id: any) => {
    const data = await getCourseStudents(id);
    this.setState({ students: data });
  }

  fetchSchedules = async (id: any) => {
    const data = await getCourseSchedules(id);
    this.setState({ schedules: data });
  }

  fetchSessions = async (id: any) => {
  }

  enrollStudent = async (id: any, studentId: any) => {
    await enroll({ course: id, student: studentId });
    await this.fetchStudents(id);
  }

  unenrollStudent = async (id: any, studentId: any) => {
    await unenroll({ course: id, student: studentId });
    await this.fetchStudents(id);
  }

  updateCourseName = async (id: any, name: string) => {
    await updateCourse(id, "name", name);
    this.fetchCourses();
    this.fetchCourse(id);
  }

  updateCourseDetail = async (id: any, detail: string) => {
    await updateCourse(id, "detail", detail);
    this.fetchCourse(id);
  }

  updateCoursePrice = async (id: any, price: number) => {
    await updateCoursePrice(id, { price });
    this.fetchCourse(id);
  }

  updateCourseAttribute = async (id: any, key: any, value: any) => {
    await updateCourse(id, key, value);
    this.fetchCourse(id);
  }

  updateCourseTeacher = async (id: any, payload: any) => {
    await deleteCourseTeacher(id);
    await updateCourseTeacher(id, payload);
    this.fetchCourse(id);
  }

  updateCourseSchedules = async () => {
  }

  updateAttendance = async (id: any, attendance: number) => {
  }

  deleteCourseTeacher = async (id: any) => {
    await deleteCourseTeacher(id);
    this.fetchCourse(id);
  }

  deleteCourse = async (id: any) => {
    await deleteCourse(id);
    await this.fetchCourses();
  }

  componentDidMount() {
    this.fetchCourses();
  }

  componentWillReceiveProps(next: any) {
    if (next.location.pathname.split("/")[2] === "list") {
      this.fetchCourses();
    }
  }


  render() {
    return (
      <>
        <List>
          <CourseTable
            {...this.props}
            createCourse={this.createCourse}
            courses={this.state.courses} />
        </List>
        <Main>
          <Route path="/course/:id/overview"
            render={(props: any) => <CourseOverview
              {...props}
              course={this.state.course}
              students={this.state.students}
              fetchCourses={this.fetchCourses}
              fetchCourse={this.fetchCourse}
              fetchStudents={this.fetchStudents}
              enrollStudent={this.enrollStudent}
              unenrollStudent={this.unenrollStudent}
              updateCourseName={this.updateCourseName}
              updateCoursePrice={this.updateCoursePrice}
              updateCourseDetail={this.updateCourseDetail}
              updateCourseAttribute={this.updateCourseAttribute}
              updateCourseTeacher={this.updateCourseTeacher}
              deleteCourse={this.deleteCourse}
              deleteCourseTeacher={this.deleteCourseTeacher}
            />}
          />
          <Route path="/course/:id/schedules"
            render={(props: any) =>
              <CourseSchedule
                {...props}
                schedule={this.state.schedule}
                schedules={this.state.schedules}
                sessions={this.state.sessions}
                fetchSchedules={this.fetchSchedules}
                fetchSessions={this.fetchSessions}
                updateAttendance={this.updateAttendance}
                updateSchedules={this.updateCourseSchedules}
              />
            }
          />
        </Main>
      </>
    );
  }
}
