import React from "react";
import { List, Main } from "../components";
import { Route } from "react-router-dom";
import selectn from "selectn";
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
import {
  createExtra,
  deleteExtra,
  updateExtra,
  updateExtraInvoice,
} from "../apis/ExtraMoneyAPI";

export class StudentPage extends React.Component<any> {

  state = {
    students: [],
    student: {},
    courses: [],
    invoices: [],
    sessions: [],
    extramoney: [],
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

  fetchExtramoney = async (id) => {
    const data = (await getStudentExtramoney(id) || []); // TOTO 더 나은 에러처리
    this.setState({ extramoney: data });
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

  createExtra = async (payload) => {
    await createExtra(payload);
    this.fetchExtramoney(selectn("id", this.state.student));
  }

  deleteExtra = async (id: any) => {
    await deleteExtra(id);
    this.fetchExtramoney(selectn("id", this.state.student));
  }

  updateExtraInvoice = async (id: any, invoiceId: any) => {
    await updateExtraInvoice(id, { invoice: invoiceId });
    this.fetchExtramoney(selectn("id", this.state.student));
  }

  updateExtra = async (id, attr, value) => {
    await updateExtra(id, attr, value);
    this.fetchExtramoney(selectn("id", this.state.student));
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
              {...props}
              fetchSessions={this.fetchSessions}
              sessions={this.state.sessions}
              fetchInvoices={this.fetchInvoices}
              invoices={this.state.invoices}
              fetchExtramoney={this.fetchExtramoney}
              extramoney={this.state.extramoney}
              createExtra={this.createExtra}
              deleteExtra={this.deleteExtra}
              updateExtra={this.updateExtra}
              fetchStudent={this.fetchStudent}
              student={this.state.student}
            />} />
        </Main>
      </>
    );
  }
}
