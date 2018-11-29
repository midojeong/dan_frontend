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
  StudentInvoice,
  StudentPayment,
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

  createStudent = async (payload) => {
    const data = await createStudent({ ...payload, discount: 0, discountReason: "--", age: 15, phone: "010-0000-0000" });
    await this.fetchStudents();
    this.props.history.push(`/student/${data.id}/overview`);
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

  deleteStudent = async (id: any) => {
    await deleteStudent(id);
    await this.fetchStudents();
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
            deleteStudent={this.deleteStudent}
            createStudent={this.createStudent} />
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
            />} />
          <Route path="/student/:id/invoice"
            render={(props: any) => <StudentInvoice
            />} />
          <Route path="/student/:id/payment"
            render={(props: any) => <StudentPayment
            />} />
        </Main>
      </>
    );
  }
}
