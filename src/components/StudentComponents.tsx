import * as React from "react";
import styled from "styled-components";
import { Text } from "./styled";
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
import { Flex } from "./styled";
import { TextfieldDialog } from "./Dialogs";
import { EditField, DetailField } from "./Field";

export class StudentTable extends React.Component<any> {

  handleClickStudent = (id: any) => () => {
    const { pathname } = this.props.location;
    if (pathname.split("/")[3] === "schedules") {
      this.props.history.push(`/student/${id}/schedules`);
    } else {
      this.props.history.push(`/student/${id}/overview`);
    }
  }

  render() {
    return (
      <>
        <Table>
          <TableHead>
            <TableCell width="50px">ID</TableCell>
            <TableCell width="250px">NAME</TableCell>
            <TableCell width="100px">AGE</TableCell>
            <TableCell width="200px">PHONE</TableCell>
            <TableCell width="100px">DISCOUNT</TableCell>
            <TableRest>DISCOUNT REASON</TableRest>
            <TableCell width="44px"></TableCell>
          </TableHead>
          <TableBody maxHeight="calc(100vh - 64px)">
            {this.props.students.map((v: any, i: number) =>
              <TableRow key={i} current={this.props.location.pathname.split("/")[2] == (selectn("id", v))}>
                <TableId>{selectn("id", v)}</TableId>
                <TableName hover cursor="pointer" onClick={this.handleClickStudent(selectn("id", v))}>{selectn("name", v)}</TableName>
                <TableMoney>{selectn("age", v)}</TableMoney>
                <TableCell width="200px">{selectn("phone", v)}</TableCell>
                <TableMoney>{selectn("discount", v)}</TableMoney>
                <TableRest>{selectn("discountReason", v)}</TableRest>
                <TableDelete onClick={() => this.props.deleteStudent(selectn("id", v))} />
              </TableRow>
            )}
          </TableBody>
          <Hr />
        </Table>
        <TextfieldDialog
          onClose={this.props.createStudent}
          title="Create new student"
          fields={["name"]}
          placeholders={[""]}
          errorHandler={[
            name => (name === ""),
          ]}
          types={["text"]}
          component={(props) =>
            <TableCreate onClick={props.onClick}>
              <Text>
                + STUDENT
              </Text>
            </TableCreate>
          } />
      </>
    );
  }
}

export class StudentOverview extends React.Component<any> {

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id !== "0") {
      this.props.fetchStudent(id);
      this.props.fetchCourses(id);
    }
  }

  componentWillReceiveProps(next: any) {
    const { id } = this.props.match.params;
    const { id: nextid } = next.match.params;
    if (id !== nextid) {
      this.props.fetchStudent(nextid);
      this.props.fetchCourses(nextid);
      this.props.fetchStudents(nextid);
    }
  }

  render() {
    const { id } = this.props.match.params;
    return (
      <OverviewWrapper>
        <InfoField
          student={this.props.student}
          updateAge={(age) => this.props.updateStudentAttribute(id, "age", age)}
          updateName={(name: string) => this.props.updateStudentName(id, name)}
          updatePhone={(phone) => this.props.updateStudentAttribute(id, "phone", phone)}
          updateDetail={(detail) => this.props.updateStudentAttribute(id, "detail", detail)}
          updateDiscount={(discount) => this.props.updateStudentAttribute(id, "discount", discount)}
          updateDiscountReason={(discountReason) => this.props.updateStudentAttribute(id, "discountReason", discountReason)}
        />
        <EnrollTable
          history={this.props.history}
          courses={this.props.courses}
        />
      </OverviewWrapper>
    );
  }
}

const OverviewWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 400px 1fr;
  grid-template-areas:
    "basic basic"
    "course course";
`;

class InfoField extends React.Component<any> {

  render() {
    return (
      <div style={{ gridArea: "basic" }}>
        <TableTitle mb={2}>
          BASIC INFORMATION
        </TableTitle>
        <Flex>
          <div style={{ flex: "1 1 0" }}>
            <EditField type="name" value={this.props.student.name} handleSubmit={this.props.updateName} />
            <EditField type="phone" value={this.props.student.phone} handleSubmit={this.props.updatePhone} />
            <DetailField fetchedValue={this.props.student.detail} handleSubmit={this.props.updateDetail} />
          </div>
          <div style={{ flex: "1 1 0" }}>
            <EditField type="age" value={this.props.student.age} handleSubmit={this.props.updateAge} />
            <EditField type="discount" value={this.props.student.discount} handleSubmit={this.props.updateDiscount} />
            <EditField type="discount reason" value={this.props.student.discountReason} handleSubmit={this.props.updateDiscountReason} />
          </div>
        </Flex>
      </div>
    );
  }
}


class EnrollTable extends React.Component<any> {

  handleClickCourse = (id) => () => {
    this.props.history.push(`/course/${id}/overview`);
  }

  render() {
    return (
      <div style={{ gridArea: "course" }}>
        <Table>
          <TableTitle>
            COURSES
          </TableTitle>
          <TableHead>
            <TableCell width="50px">ID</TableCell>
            <TableCell width="250px">NAME</TableCell>
            <TableCell width="100px">PRICE</TableCell>
            <TableRest>DETAIL</TableRest>
          </TableHead>
          <TableBody maxHeight="calc(100vh - 400px - 96px)">
            {this.props.courses.map((v: any, i: any) =>
              <TableRow key={i}>
                <TableId>{selectn("Course.id", v)}</TableId>
                <TableName cursor="pointer" hover onClick={this.handleClickCourse(selectn("Course.id", v))}>
                  {selectn("Course.name", v)}
                </TableName>
                <TableMoney>{selectn("Course.price", v)}</TableMoney>
                <TableRest>{selectn("Course.detail", v)}</TableRest>
              </TableRow>
            )}
          </TableBody>
          <Hr />
        </Table>
      </div>
    );
  }
}
