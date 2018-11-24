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

  updateCourse,
  updateCoursePrice,
  updateCourseTeacher,
  updateCourseSchedule,

  deleteCourse,
  deleteCourseTeacher,
} from "../apis/CourseAPI";

export class CoursePage extends React.Component<any> {

  state = {
    courses: [],
    course: {},
    students: [],
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
    this.setState({ student: data });
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

  deleteCourse = () => {
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
          <CourseTable {...this.props} courses={this.state.courses} />
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
              updateCourseName={this.updateCourseName}
              updateCoursePrice={this.updateCoursePrice}
              updateCourseDetail={this.updateCourseDetail}
              deleteCourse={this.deleteCourse}
            />}
          />
          <Route path="/course/:id/schedules" component={CourseSchedule} />
        </Main>
      </>
    );
  }
}
