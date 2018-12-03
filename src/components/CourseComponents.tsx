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
import { Picker, TextfieldDialog, DatePicker } from "./Dialogs";
import { getTeachers } from "../apis/TeacherAPI";
import { getStudents } from "../apis/StudentAPI";
import { Schedule } from "../models/Schedule";
import { Session } from "../models/Session";
import moment from "moment";

export class CourseTable extends React.Component<any> {

  handleClickCourse = (id: any) => () => {
    const { pathname } = this.props.location;
    if (pathname.split("/")[3] === "schedules") {
      this.props.history.push(`/course/${id}/schedules/list`);
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
  fetchSessions: (id: any) => any;
  updateSchedule: (id: any, payload: any) => any;
  updateSessionDetail: () => any;
  updateAttendance: (sessionId, attendance) => any;
  updateSessionDiscount: (sessionId, discount) => any;
}

export class CourseSchedule extends React.Component<ScheduleProps> {

  componentDidMount() {
    const { courseId } = this.props.match.params;
    const { scheduleId } = this.props.match.params;
    this.props.fetchSchedules(courseId);
    this.props.fetchSchedule(scheduleId === "list" ? 0 : scheduleId);
    this.props.fetchSessions(scheduleId === "list" ? 0 : scheduleId);
  }

  componentWillReceiveProps(next: any) {

    const { scheduleId } = this.props.match.params;
    const { scheduleId: nextScheduleId } = next.match.params;

    if (nextScheduleId !== "list" && nextScheduleId !== scheduleId) {
      this.props.fetchSchedule(nextScheduleId);
      this.props.fetchSessions(nextScheduleId);
    }

    if (next.match.params.courseId !== this.props.match.params.courseId) {
      this.props.fetchSchedules(next.match.params.courseId);
      this.props.fetchSchedule(0);
      this.props.fetchSessions(0);
    }
  }

  createSchedule = (payload) => {
    const { courseId } = this.props.match.params;
    this.props.updateSchedule(courseId, { mode: "create", ...payload });
  }

  updateSchedule = (payload) => {

  }

  deleteSchedule = (id) => {
    const { courseId } = this.props.match.params;
    this.props.updateSchedule(courseId, { mode: "delete", "from": id });
  }

  goto = (scheduleId) => {
    const { courseId } = this.props.match.params;
    this.props.history.push(`/course/${courseId}/schedules/${scheduleId}`);
  }

  render() {
    return (
      <ScheduleWrapper>
        <ScheduleTable
          create={this.createSchedule}
          delete={this.deleteSchedule}
          current={selectn("id", this.props.schedule)}
          schedules={this.props.schedules}
          goto={this.goto}
        />
        <ScheduleOverview
          schedule={this.props.schedule}
          update={this.updateSchedule}
        />
        <ScheduleSessions
          history={this.props.history}
          sessions={this.props.sessions}
          updateDetail={this.props.updateSessionDetail}
          updateAttendance={this.props.updateAttendance}
          updateDiscount={this.props.updateSessionDiscount}
        />
      </ScheduleWrapper>
    );
  }
}

class ScheduleTable extends React.Component<any> {

  handleSelect = (v) => {
    this.props.create(v);
  };

  render() {
    return (
      <div style={{ gridArea: "schedule", borderRight: "1px solid rgba(22,27,72,0.1)" }}>
        <TableTitle>
          SCHEDULES
        </TableTitle>
        <TableHead>
          <TableCell width="40px"></TableCell>
          <TableCell width="200px">DATE</TableCell>
          <TableCell width="115px">DAY OF WEEK</TableCell>
          <TableCell width="50px">TIME</TableCell>
          <TableRest>DETAIL</TableRest>
          <TableCell width="44px"></TableCell>
        </TableHead>
        <TableBody maxHeight="calc(100vh - 64px)">
          {this.props.schedules.filter(v => selectn("visible", v)).map((v: any, i: number) =>
            <TableRow key={i} current={this.props.current && this.props.current === selectn("id", v)}>
              <TableCell width="40px">{i + 1}</TableCell>
              <TableCell width="200px" hover cursor="pointer" onClick={() => this.props.goto(selectn("id", v))}>{selectn("date", v)}</TableCell>
              <TableCell width="115px">{moment(selectn("date", v)).format("dddd")}</TableCell>
              <TableCell width="50px">{selectn("time", v)}</TableCell>
              <TableRest>{selectn("detail", v)}</TableRest>
              <TableDelete onClick={() => this.props.delete(selectn("id", v))} />
            </TableRow>
          )}
        </TableBody>
        <DatePicker
          onClose={this.handleSelect}
          type="student"
          excludes={this.props.schedules.filter(v => selectn("visible", v)).map(x => x.date)}
          component={(props) =>
            <TableCreate onClick={props.onClick}>
              <Text>
                + ADD SCHEDULE
              </Text>
            </TableCreate>
          } />
      </div>
    );
  }
}

class ScheduleOverview extends React.Component<any> {

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


class ScheduleSessions extends React.Component<any> {

  updateAttendance = (id, attendance) => {
    this.props.updateAttendance(id, attendance);
  }

  updateDiscount = (id, discount) => {
    this.props.updateDiscount(id, discount);
  }

  render() {
    console.log(this.props.sessions);
    return (
      <div style={{ gridArea: "session" }}>
        <TableTitle>
          ATTENDANCE and DISCOUNT
        </TableTitle>
        <TableHead>
          <TableCell width="50px">SID</TableCell>
          <TableCell width="200px">NAME</TableCell>
          <TableCell width="120px">ATTENDANCE</TableCell>
          <TableCell width="100px">DISCOUNT</TableCell>
          <TableRest>DC REASON</TableRest>
        </TableHead>
        <TableBody>
          {this.props.sessions.map((v, i) =>
            <TableRow key={i} >
              <TableCell width="50px">{selectn("id", v)}</TableCell>
              <TableCell
                width="200px"
                cursor="pointer"
                hover
                onClick={() => { this.props.history.push(`/student/${selectn("Student.id", v)}/overview`) }}>
                {selectn("Student.name", v)}
              </TableCell>
              <TextfieldDialog
                onClose={(payload) => this.updateAttendance(selectn("id", v), payload.attendance)}
                title="Update attendance"
                fields={["attendance"]}
                placeholders={["0"]}
                value={{ attendance: selectn("attendance", v) }}
                errorHandler={[
                  attendance => (attendance < 0 || attendance > selectn("Schedule.time", v))
                ]}
                types={["number"]}
                component={(props) =>
                  <TableCell width="120px" onClick={props.onClick} hover cursor="pointer">
                    {selectn("attendance", v)}/{selectn("Schedule.time", v)}
                  </TableCell>
                } />
              <TextfieldDialog
                onClose={(payload) => this.updateDiscount(selectn("id", v), payload.discount)}
                title="Update discount"
                fields={["discount"]}
                placeholders={["0"]}
                value={{ discount: selectn("discount", v) }}
                errorHandler={[
                  discount => (discount < 0)
                ]}
                types={["number"]}
                component={(props) =>
                  <TableCell width="100px" onClick={props.onClick} hover cursor="pointer">
                    {selectn("discount", v)}
                  </TableCell>
                } />
              <TableRest>{selectn("discountReason", v)}</TableRest>
            </TableRow>
          )}
          <Hr />
        </TableBody>
      </div>
    );
  }
}
