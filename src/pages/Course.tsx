import React from "react";
import { List, Main } from "../components";
import selectn from "selectn";
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
  getSchedule,
  getScheduleSessions,
  updateSchedule,
} from "../apis/ScheduleAPI";
import {
  enroll,
  unenroll,
} from "../apis/EnrollAPI";
import {
  updateSessionAttendance,
  updateSessionDiscount,
  updateSessionActive,
  updateSession,
} from "../apis/SessionAPI";

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

  fetchSchedule = async (id: any) => {
    const data = await getSchedule(id);
    this.setState({ schedule: data });
  }

  fetchSessions = async (id: any) => {
    const data = await getScheduleSessions(id);
    this.setState({ sessions: data });
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

  updateCourseSchedule = async (id: any, payload: any) => {
    await updateCourseSchedule(id, payload);
    this.fetchSchedules(id);
    switch (payload.mode) {
      case "create":
        break;
      case "update":
        this.fetchSchedule(payload.from);
        this.fetchSessions(payload.from);
        break;
      case "delete":
        this.props.history.push(`/course/${id}/schedules/list`);
        break;
      default:
        break;
    }
  }

  updateScheduleDetail = async (id: any, detail: string) => {
    await updateSchedule(id, "detail", detail);
    this.fetchSchedule(id);
  }

  //C
  updateAttendance = async (sessionId: any, attendance: number) => {
    await updateSessionAttendance(sessionId, { attendance });
    this.fetchSessions(selectn("id", this.state.schedule));
  }

  //C
  updateSessionDiscount = async (sessionId: any, discount: number) => {
    await updateSessionDiscount(sessionId, { discount });
    this.fetchSessions(selectn("id", this.state.schedule));
  }

  //C
  updateSessionDetail = async (sessionId: any, detail: string) => {
    await updateSession(sessionId, "detail", detail);
    this.fetchSessions(selectn("id", this.state.schedule));
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
          <Route path="/course/:courseId/schedules/:scheduleId"
            render={(props: any) =>
              <CourseSchedule
                {...props}
                schedule={this.state.schedule}
                schedules={this.state.schedules}
                sessions={this.state.sessions}
                fetchSchedule={this.fetchSchedule}
                fetchSchedules={this.fetchSchedules}
                fetchSessions={this.fetchSessions}
                updateSchedule={this.updateCourseSchedule}
                updateScheduleDetail={this.updateScheduleDetail}
                updateSessionDetail={this.updateSessionDetail}
                updateAttendance={this.updateAttendance}
                updateSessionDiscount={this.updateSessionDiscount}
              />
            }
          />
        </Main>
      </>
    );
  }
}
