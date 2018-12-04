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
import { TextfieldDialog } from "./Dialogs";
import { Flex } from "./styled";
import { EditField, DetailField } from "./Field";

export class TeacherTable extends React.Component<any> {

  handleClickTeacher = (id: any) => () => {
    const { pathname } = this.props.location;
    this.props.history.push(`/teacher/${id}/overview`);
  }

  render() {
    return (
      <>
        <Table>
          <TableHead>
            <TableCell width="50px">ID</TableCell>
            <TableCell width="250px">NAME</TableCell>
            <TableCell width="200px">CONTRACT TYPE</TableCell>
            <TableCell width="100px">AMOUNT</TableCell>
            <TableRest>DETAIL</TableRest>
            <TableCell width="44px"></TableCell>
          </TableHead>
          <TableBody maxHeight="calc(100vh - 64px)">
            {this.props.teachers.map((v: any, i: number) =>
              <TableRow key={i} current={this.props.location.pathname.split("/")[2] == (selectn("id", v))}>
                <TableId>{selectn("id", v)}</TableId>
                <TableName hover cursor="pointer" onClick={this.handleClickTeacher(selectn("id", v))}>{selectn("name", v)}</TableName>
                <TableCell width="200px">{selectn("contractType", v)}</TableCell>
                <TableMoney>{selectn("contract", v)}</TableMoney>
                <TableRest>{selectn("detail", v)}</TableRest>
                <TableDelete onClick={() => this.props.deleteTeacher(selectn("id", v))} />
              </TableRow>
            )}
          </TableBody>
          <Hr />
        </Table>
        <TextfieldDialog
          onClose={this.props.createTeacher}
          title="Create new teacher"
          fields={["name"]}
          placeholders={[""]}
          errorHandler={[
            name => (name === ""),
          ]}
          types={["text"]}
          component={(props) =>
            <TableCreate onClick={props.onClick}>
              <Text>
                + TEACHER
              </Text>
            </TableCreate>
          } />
      </>
    );
  }
}

export class TeacherOverview extends React.Component<any> {

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id !== "0") {
      this.props.fetchTeacher(id);
    }
  }

  componentWillReceiveProps(next: any) {
    const { id } = this.props.match.params;
    const { id: nextid } = next.match.params;
    if (id !== nextid) {
      this.props.fetchTeacher(nextid);
      this.props.fetchTeachers(nextid);
    }
  }

  render() {
    const { id } = this.props.match.params;
    return (
      <OverviewWrapper>
        <InfoField
          teacher={this.props.teacher}
          updateName={(name: string) => this.props.updateTeacherName(id, name)}
          updatePhone={(phone) => this.props.updateTeacherAttribute(id, "phone", phone)}
          updateDetail={(detail) => this.props.updateTeacherAttribute(id, "detail", detail)}
          updateContract={(contract) => this.props.updateTeacherAttribute(id, "contract", contract)}
          updateContractType={(contractType) => this.props.updateTeacherAttribute(id, "contractType", contractType)}
        />
        <CourseTable />
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
            <EditField type="name" value={this.props.teacher.name} handleSubmit={this.props.updateName} />
            <EditField type="phone" value={this.props.teacher.phone} handleSubmit={this.props.updatePhone} />
            <DetailField fetchedValue={this.props.teacher.detail} handleSubmit={this.props.updateDetail} />
          </div>
          <div style={{ flex: "1 1 0" }}>
            <EditField type="contract" value={this.props.teacher.contract} handleSubmit={this.props.updateContract} />
            <EditField type="contract type" value={this.props.teacher.contractType} handleSubmit={this.props.updateContractType} />
          </div>
        </Flex>
      </div>
    );
  }
}


class CourseTable extends React.Component<any> {

  /* handleClickTeacher = (id) => () => {
   *   this.props.history.push(`/teacher/${id}/overview`);
   * } */

  render() {
    return (
      <div style={{ gridArea: "course" }}>
        <Table>
          <TableTitle>
            COURSES(작업중)
          </TableTitle>
        </Table>
      </div>
    );
  }
}
