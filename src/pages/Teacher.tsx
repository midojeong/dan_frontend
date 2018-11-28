import React from "react";
import { List, Main } from "../components";
import {
  TeacherTable,
  TeacherOverview,
} from "../components/TeacherComponents";
import { Route } from "react-router-dom";
import {
  createTeacher,

  getTeacher,
  getTeachers,

  updateTeacher,

  deleteTeacher,
} from "../apis/TeacherAPI";

export class TeacherPage extends React.Component<any, any> {

  state = {
    teacher: {},
    teachers: [],
    courses: [],
  }

  createTeacher = async (payload) => {
    const data = await createTeacher({ ...payload, contractType: "percent", contract: 50, phone: "010-0000-0000" });
    await this.fetchTeachers();
    this.props.history.push(`/teacher/${data.id}/overview`);
  }

  fetchTeachers = async () => {
    const data = await getTeachers();
    this.setState({ teachers: data });
  }

  fetchTeacher = async (id: any) => {
    const data = await getTeacher(id);
    this.setState({ teacher: data });
  }

  fetchCourses = (id: any) => {
    this.setState({ courses: [] });
  }

  updateTeacherName = async (id: any, name: string) => {
    await updateTeacher(id, "name", name);
    this.fetchTeachers();
    this.fetchTeacher(id);
  }

  updateTeacherAttribute = async (id: any, key: any, value: any) => {
    await updateTeacher(id, key, value);
    this.fetchTeacher(id);
  }

  deleteTeacher = async (id: any) => {
    await deleteTeacher(id);
    await this.fetchTeachers();
  }

  componentDidMount() {
    this.fetchTeachers();
  }

  componentWillReceiveProps(next: any) {
    if (next.location.pathname.split("/")[2] === "list") {
      this.fetchTeachers();
    }
  }

  render() {
    return (
      <>
        <List>
          <TeacherTable
            {...this.props}
            teachers={this.state.teachers}
            fetchTeachers={this.fetchTeachers}
            deleteTeacher={this.deleteTeacher}
            createTeacher={this.createTeacher} />
        </List>
        <Main>
          <Route path="/teacher/:id/overview"
            render={(props: any) => <TeacherOverview
              {...props}
              teacher={this.state.teacher}
              courses={this.state.courses}
              fetchTeacher={this.fetchTeacher}
              fetchTeachers={this.fetchTeachers}
              fetchCourses={this.fetchCourses}
              updateTeacherName={this.updateTeacherName}
              updateTeacherAttribute={this.updateTeacherAttribute}
            />}
          />
        </Main>
      </>
    );
  }
}
