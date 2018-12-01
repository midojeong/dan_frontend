import * as React from "react";
import styled from "styled-components";
import { Text } from "./styled";
import { EditField, DetailField, PickerField } from "./Field";
import {
  Table, TableRow,
  TableId, TableName,
  TableHead, TableCell,
  TableEntity, TableRest,
  TableMoney, TableCreate,
  TableTitle, TableDelete,
  TableBody,
} from "./Table";
import { Hr } from "./Hr";
const selectn = require("selectn");
import { Picker, TextfieldDialog } from "./Dialogs";
import { getTeachers } from "../apis/TeacherAPI";
import { getStudents } from "../apis/StudentAPI";
import { Schedule } from "../models/Schedule";
import { Session } from "../models/Session";

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
            <TableCell width="44px"></TableCell>
          </TableHead>
          <TableBody maxHeight="calc(100vh - 64px)">
            {this.props.courses.map((v: any, i: number) =>
              <TableRow key={i} current={this.props.location.pathname.split("/")[2] == (selectn("id", v))}>
                <TableId>{selectn("id", v)}</TableId>
                <TableName hover cursor="pointer" onClick={this.handleClickCourse(selectn("id", v))}>{selectn("name", v)}</TableName>
                <TableEntity>{selectn("Teacher.name", v)}</TableEntity>
                <TableMoney>{selectn("price", v)}</TableMoney>
                <TableRest>{selectn("detail", v)}</TableRest>
                <TableDelete onClick={() => this.props.deleteCourse(selectn("id", v))} />
              </TableRow>
            )}
          </TableBody>
          <Hr />
        </Table>
        <TextfieldDialog
          onClose={this.props.createCourse}
          title="Create new course"
          fields={["name", "price"]}
          placeholders={["", "10000"]}
          errorHandler={[
            name => (name === ""),
            price => (price <= 0)
          ]}
          types={["text", "number"]}
          component={(props) =>
            <TableCreate onClick={props.onClick}>
              <Text>
                + COURSE
              </Text>
            </TableCreate>
          } />
      </>
    );
  }
}

export class CourseOverview extends React.Component<any> {

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id !== "0") {
      this.props.fetchCourse(id);
      this.props.fetchStudents(id);
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
    const { id } = this.props.match.params;
    return (
      <OverviewWrapper>
        <InfoField
          course={this.props.course}
          updateName={(name: string) => this.props.updateCourseName(id, name)}
          updateDetail={(detail: string) => this.props.updateCourseDetail(id, detail)}
          updatePrice={(price: number) => this.props.updateCoursePrice(id, price)}
        />
        <TeacherField
          course={this.props.course}
          updateCourseTeacher={(teacherId: any) => this.props.updateCourseTeacher(id, { teacher: teacherId })}
          overrideTeacher={(key: any, value: any) => this.props.updateCourseAttribute(id, key, value)}
          deleteCourseTeacher={() => this.props.deleteCourseTeacher(id)}
        />
        <EnrollTable
          history={this.props.history}
          students={this.props.students}
          unenrollStudent={(studentId) => this.props.unenrollStudent(id, studentId)}
          enrollStudent={(studentId) => this.props.enrollStudent(id, studentId)}
        />
      </OverviewWrapper>
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
        <TableTitle mb={2}>
          BASIC INFORMATION
        </TableTitle>
        <EditField type="name" value={this.props.course.name} handleSubmit={this.props.updateName} />
        <EditField type="price" value={this.props.course.price} handleSubmit={this.props.updatePrice} />
        <DetailField fetchedValue={this.props.course.detail} handleSubmit={this.props.updateDetail} />
      </div>
    );
  }
}

class TeacherField extends React.Component<any> {


  updateContract = (value) => {
    this.props.overrideTeacher("contract", parseInt(value));
  }

  updateContractType = (value) => {
    this.props.overrideTeacher("contractType", value);
  }

  render() {
    return (
      <div style={{ gridArea: "teacher" }}>
        <TableTitle mb={2}>
          TEACHER
        </TableTitle>
        <PickerField
          type="name"
          value={selectn("Teacher.name", this.props.course)}
          table="teacher"
          fetch={getTeachers}
          handleSubmit={this.props.updateCourseTeacher} />
        <EditField
          type="contract"
          value={selectn("contract", this.props.course) || selectn("Teacher.contract", this.props.course)}
          handleSubmit={this.updateContract} />
        <EditField
          type="contract type"
          value={selectn("contractType", this.props.course) || selectn("Teacher.contractType", this.props.course)}
          handleSubmit={this.updateContractType} />
      </div>
    );
  }
}

class EnrollTable extends React.Component<any> {

  handleClickStudent = (id) => () => {
    this.props.history.push(`/student/${id}/overview`);
  }

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
            <TableCell width="100px">AGE</TableCell>
            <TableCell width="200px">PHONE</TableCell>
            <TableCell width="100px">DISCOUNT</TableCell>
            <TableRest>DISCOUNT REASON</TableRest>
            <TableCell width="44px"></TableCell>
          </TableHead>
          <TableBody maxHeight="calc(100vh - 400px - 96px)">
            {this.props.students.map((v: any, i: any) =>
              <TableRow key={i}>
                <TableId>{selectn("id", v)}</TableId>
                <TableName cursor="pointer" hover onClick={this.handleClickStudent(selectn("id", v))}>{selectn("name", v)}</TableName>
                <TableMoney>{selectn("age", v)}</TableMoney>
                <TableCell width="200px">{selectn("phone", v)}</TableCell>
                <TableMoney>{selectn("discount", v)}</TableMoney>
                <TableRest>{selectn("discountReason", v)}</TableRest>
                <TableDelete onClick={() => this.props.unenrollStudent(selectn("id", v))} />
              </TableRow>
            )}
          </TableBody>
          <Hr />
        </Table>
        <Picker
          onClose={this.props.enrollStudent}
          fetch={getStudents}
          type="student"
          component={(props) =>
            <TableCreate onClick={props.onClick}>
              <Text>
                + ADD STUDENT
              </Text>
            </TableCreate>
          } />
      </div>
    );
  }
}

const ScheduleWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 400px 1fr;
  grid-template-areas:
    "schedule basic"
    "schedule session";
`;

interface ScheduleProps {
  history: any;
  location: any;
  match: any;
  schedule: Schedule;
  schedules: Schedule[];
  sessions: Session[];
  fetchSchedule: (id: any) => any;
  fetchSchedules: (id: any) => any;
  fetchSessions: () => any;
  updateSchedule: () => any;
  updateSessionDetail: () => any;
  updateAttendance: () => any;
  updateSessionDiscounnt: () => any;
}

export class CourseSchedule extends React.Component<ScheduleProps> {

  componentDidMount() {
    const { courseId } = this.props.match.params;
    const { scheduleId } = this.props.match.params;
    this.props.fetchSchedules(courseId);
    if (scheduleId !== "list") this.props.fetchSchedule(scheduleId);
  }


  render() {
    console.log(this.props);
    return (
      <ScheduleWrapper>
        <ScheduleTable />
        <ScheduleOverview />
        <ScheduleSessions />
      </ScheduleWrapper>
    );
  }
}

class ScheduleTable extends React.Component {

  render() {
    return (
      <div style={{ gridArea: "schedule", borderRight: "1px solid rgba(22,27,72,0.1)" }}>
        <TableTitle>
          SCHEDULES
        </TableTitle>
        <TableHead>
          <TableCell width="250px">DATE</TableCell>
          <TableCell width="100px">TIME</TableCell>
          <TableCell width="200px">DURATION</TableCell>
          <TableRest>DETAIL</TableRest>
          <TableCell width="44px"></TableCell>
        </TableHead>
        <TableBody>

        </TableBody>
        <TableCreate>
          <Text>
            + SCHEDULE
          </Text>
        </TableCreate>
      </div>
    );
  }
}

class ScheduleOverview extends React.Component {

  render() {
    return (
      <div style={{ gridArea: "basic" }}>
        <TableTitle>
          BASIC
        </TableTitle>
      </div>
    );
  }
}


class ScheduleSessions extends React.Component {

  render() {
    return (
      <div style={{ gridArea: "session" }}>
        <TableTitle>
          STUDENTS
        </TableTitle>
        <TableHead>
          <TableCell width="50px">ID</TableCell>
          <TableCell width="200px">NAME</TableCell>
          <TableCell width="120px">ATTENDANCE</TableCell>
          <TableCell width="100px">DISCOUNT</TableCell>
          <TableRest>DC REASON</TableRest>
        </TableHead>
      </div>
    );
  }
}
