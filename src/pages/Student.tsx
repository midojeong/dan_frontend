import React from "react";
import { List, Main } from "../components";
import { Route } from "react-router-dom";
import {
  createStudent,
  getStudent,
  getStudentCourses,
  getStudentExtramoney,
  getStudentInvoices,
  getStudents,
  getStudentSessions,
} from "../apis/StudentAPI";
import {
  StudentTable,
  StudentOverview,
} from "../components/StudentComponents";

export class StudentPage extends React.Component<any> {

  state = {
    students: [],
    student: {},
  }

  fetchStudents = async () => {
    const data = (await getStudents() || []);
    this.setState({ students: data });
  }

  fetchStudent = async (id: any) => {
    const data = await getStudent(id);
    this.setState({ student: data });
  }

  componentDidMount() {
    this.fetchStudents();
  }

  render() {
    return (
      <>
        <List>
          <StudentTable
            {...this.props}
            students={this.state.students}
            fetchStudents={this.fetchStudents}
            createStudent={createStudent} />
        </List>
        <Main>
        </Main>
      </>
    );
  }
}
