import React from "react";
import { List, Main } from "../components";
import {
  CourseTable,
  CourseOverview,
  CourseSchedule,
} from "../components/CourseComponents";
import { Route } from "react-router-dom";
import { getCourses, getCourse, getCourseStudents } from "../apis/CourseAPI";

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

  componentDidMount() {
    this.fetchCourses();
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
            />}
          />
          <Route path="/course/:id/schedules" component={CourseSchedule} />
        </Main>
      </>
    );
  }
}
