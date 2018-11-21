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
            <TableCell width="150px">DISCOUNT</TableCell>
            <TableCell width="200px">DISCOUNT REASON</TableCell>
            <TableRest>DETAIL</TableRest>
          </TableHead>
          {this.props.students.map((v: any, i: number) =>
            <TableRow key={i} current={this.props.location.pathname.split("/")[2] == (selectn("id", v))}>
              <TableId>{selectn("id", v)}</TableId>
              <TableName hover cursor="pointer" onClick={this.handleClickStudent(selectn("id", v))}>{selectn("name", v)}</TableName>
              <TableMoney>{selectn("discount", v)}</TableMoney>
              <TableCell width="200px">{selectn("discountReason", v)}</TableCell>
              <TableRest>{selectn("detail", v)}</TableRest>
            </TableRow>
          )}
          <Hr />
        </Table>
        <TableCreate>
          <Text>
            + STUDENT
          </Text>
        </TableCreate>
      </>
    );
  }
}

export class StudentOverview extends React.Component<any> {

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id !== "0") {
      this.props.fetchStudent(id);
    }
  }

  componentWillReceiveProps(next: any) {
    const { id } = this.props.match.params;
    const { id: nextid } = next.match.params;
    if (id !== nextid) {
      this.props.fetchStudent(nextid);
      this.props.fetchStudents(nextid);
    }
  }

  render() {
    return (
      <OverviewWrapper>
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
