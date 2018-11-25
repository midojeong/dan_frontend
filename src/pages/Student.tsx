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

  deleteStudent,
  updateStudent,
} from "../apis/StudentAPI";
import {
  StudentTable,
  StudentOverview,
} from "../components/StudentComponents";

export class StudentPage extends React.Component<any> {

  state = {
    students: [],
    student: {},
    courses: [],
    invoices: [],
    sessions: [],
    extramoeny: [],
  }

  fetchStudents = async () => {
    const data = (await getStudents() || []); // TODO 더 나은 에러처리
    this.setState({ students: data });
  }

  fetchStudent = async (id) => {
    const data = await getStudent(id);
    this.setState({ student: data });
  }

  fetchCourses = async (id) => {
    const data = (await getStudentCourses(id) || []); // TOTO 더 나은 에러처리
    this.setState({ courses: data });
  }

  fetchInvoices = async (id) => {
    const data = (await getStudentInvoices(id) || []); // TOTO 더 나은 에러처리
    this.setState({ invoices: data });
  }

  fetchSessions = async (id) => {
    const data = (await getStudentSessions(id) || []); // TOTO 더 나은 에러처리
    this.setState({ sessions: data });
  }

  fetchExtramoeny = async (id) => {
    const data = (await getStudentExtramoney(id) || []); // TOTO 더 나은 에러처리
    this.setState({ extramoenys: data });
  }

  updateStudentAttribute = async (id: any, key: any, value: any) => {
    await updateStudent(id, key, value);
    this.fetchStudent(id);
  }

  updateStudentName = async (id: any, name: string) => {
    await updateStudent(id, "name", name);
    this.fetchStudents();
    this.fetchStudent(id);
  }

  createStudent = async (payload) => {
    const data = await createStudent(payload);
    await this.fetchStudents();
    this.props.history.push(`/student/${data.id}/overview`);
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
          <Route path="/student/:id/overview"
            render={(props: any) => <StudentOverview
              {...props}
              student={this.state.student}
              courses={this.state.courses}
              fetchStudent={this.fetchStudent}
              fetchStudents={this.fetchStudents}
              fetchCourses={this.fetchCourses}
              updateStudentName={this.updateStudentName}
              updateStudentAttribute={this.updateStudentAttribute}
            />}
          />
        </Main>
      </>
    );
  }
}
