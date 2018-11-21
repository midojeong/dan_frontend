import * as React from "react";
import styled from "styled-components";
import { Text } from "./styled";
import {
  Table, TableRow,
  TableId, TableName,
  TableHead, TableCell,
  TableEntity, TableRest,
  TableMoney, TableCreate,
  TableTitle,
} from "./Table";
import { Hr } from "./Hr";
const selectn = require("selectn");

export class CourseTable extends React.Component<any> {

  handleClickCourse = (id: any) => () => {
    const { pathname } = this.props.location;
    if (pathname.split("/")[3] === "schedules") {
      this.props.history.push(`/course/${id}/schedules`);
    } else {
      this.props.history.push(`/course/${id}/overview`);
    }
  }

  render() {
    return (
      <>
        <Table>
          <TableHead>
            <TableCell width="50px">ID</TableCell>
            <TableCell width="250px">NAME</TableCell>
            <TableCell width="150px">TEACHER</TableCell>
            <TableCell width="100px">PRICE</TableCell>
            <TableRest>DETAIL</TableRest>
          </TableHead>
          {this.props.courses.map((v: any, i: number) =>
            <TableRow key={i} current={this.props.location.pathname.split("/")[2] == (selectn("id", v))}>
              <TableId>{selectn("id", v)}</TableId>
              <TableName hover cursor="pointer" onClick={this.handleClickCourse(selectn("id", v))}>{selectn("name", v)}</TableName>
              <TableEntity>{selectn("Teacher.name", v)}</TableEntity>
              <TableMoney>{selectn("price", v)}</TableMoney>
              <TableRest>{selectn("detail", v)}</TableRest>
            </TableRow>
          )}
          <Hr />
        </Table>
        <TableCreate>
          <Text>
            + COURSE
          </Text>
        </TableCreate>
      </>
    );
  }
}

export class CourseOverview extends React.Component<any> {

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id !== "0") {
      this.props.fetchCourse(id);
    }
  }

  componentWillReceiveProps(next: any) {
    const { id } = this.props.match.params;
    const { id: nextid } = next.match.params;
    if (id !== nextid) {
      this.props.fetchCourse(nextid);
      this.props.fetchStudents(nextid);
    }
  }

  render() {
    return (
      <OverviewWrapper>
        <InfoField course={this.props.course} />
        <TeacherField teacher={this.props.course.Teacher} />
        <EnrollTable students={this.props.students} fetchStudents={this.props.fetchStudents} />
      </OverviewWrapper>
    );
  }
}

export class CourseSchedule extends React.Component {

  render() {
    return (
      <div>Schedule</div>
    );
  }
}

const OverviewWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 400px 1fr;
  grid-template-areas:
    "basic teacher"
    "student student";
`;

class InfoField extends React.Component<any> {

  render() {
    return (
      <div style={{ gridArea: "basic", borderRight: "1px solid rgba(22,27,72,0.08)" }}>
        <TableTitle>
          BASIC INFORMATION
        </TableTitle>
      </div>
    );
  }
}

class TeacherField extends React.Component<any> {

  render() {
    return (
      <div style={{ gridArea: "teacher" }}>
        <TableTitle>
          TEACHER
        </TableTitle>
      </div>
    );
  }
}

class EnrollTable extends React.Component<any> {

  render() {
    return (
      <div style={{ gridArea: "student" }}>
        <Table>
          <TableTitle>
            STUDENTS
          </TableTitle>
          <TableHead>
            <TableCell width="50px">ID</TableCell>
            <TableCell width="250px">NAME</TableCell>
            <TableCell width="100px">DISCOUNT</TableCell>
            <TableCell width="200px">DISCOUNT REASON</TableCell>
            <TableRest>DETAIL</TableRest>
          </TableHead>
          {this.props.students.map((v: any, i: any) =>
            <TableRow key={i}>
              <TableId>{selectn("id", v)}</TableId>
              <TableName>{selectn("name", v)}</TableName>
              <TableMoney>{selectn("discount", v)}</TableMoney>
              <TableCell width="200px">{selectn("discountReason", v)}</TableCell>
              <TableRest>{selectn("detail", v)}</TableRest>
            </TableRow>
          )}
        </Table>
        <TableCreate>
          <Text>
            + ADD STUDENT
          </Text>
        </TableCreate>
      </div>
    );
  }
}
