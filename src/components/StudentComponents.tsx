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
  TableBody, TableCheckBox
} from "./Table";
import { Hr } from "./Hr";
const selectn = require("selectn");
import * as R from "ramda";
import { Flex } from "./styled";
import { SendButton, ViewListButton } from "./Icon";
import { TextfieldDialog } from "./Dialogs";
import { EditField, DetailField } from "./Field";
import { getInvoiceReport } from "../apis/InvoiceAPI";

export class StudentTable extends React.Component<any> {

  handleClickStudent = (id: any) => () => {
    const { pathname } = this.props.location;
    if (pathname.split("/")[3] === "invoice") {
      this.props.history.push(`/student/${id}/invoice`);
    } else if (pathname.split("/")[3] === "payment") {
      this.props.history.push(`/student/${id}/payment`);
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
            <EditField type="name" value={selectn("name", this.props.student)} handleSubmit={this.props.updateName} />
            <EditField type="phone" value={selectn("phone", this.props.student)} handleSubmit={this.props.updatePhone} />
            <DetailField fetchedValue={selectn("detail", this.props.student)} handleSubmit={this.props.updateDetail} />
          </div>
          <div style={{ flex: "1 1 0" }}>
            <EditField type="age" value={selectn("age", this.props.student)} handleSubmit={this.props.updateAge} />
            <EditField type="discount" value={selectn("discount", this.props.student)} handleSubmit={this.props.updateDiscount} />
            <EditField type="discount reason" value={selectn("discountReason", this.props.student)} handleSubmit={this.props.updateDiscountReason} />
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

const InvoiceWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 400px;
  grid-template-areas:
  "table detail";
`;

export class StudentInvoice extends React.Component<any> {

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchInvoices(id);
  }

  componentWillReceiveProps(nextProps) {
    const { id: current } = this.props.match.params;
    const { id: next } = nextProps.match.params;
    if (current !== next) {
      this.props.fetchInvoices(next);
    }
  }

  render() {
    return (
      <InvoiceWrapper>
        <InvoiceTable
          invoices={(this.props.invoices || []).filter(x => x.published).filter(x => x.visible)}
        />
        <InvoiceDetail />
      </InvoiceWrapper>
    );
  }
}

/* 0:
 *                                                          amount: -160000
 * card: -40000
 * cardSettled: false
 * cash: -20000
 * createdAt: "2018-12-05 00:45:03"
 * detail: "sample"
 * id: 1
 * published: false
 * publishedAt: null
 * settled: false
 * settledAt: null
 * student: 1
 * transfer: -100000
 * transferSettled: false
 * updatedAt: "2018-12-05 01:14:12"
 * visible: true
 *  */

class InvoiceTable extends React.Component<any> {

  render() {
    return (
      <div style={{ gridArea: "table", borderRight: "1px solid rgba(22,27,72,0.1)" }}>
        <Table>
          <TableTitle>
            INVOICES(작업중)
          </TableTitle>
          <TableHead>
            <TableCell width="50px">ID</TableCell>
            <TableCell width="100px">AMOUNT</TableCell>
            <TableCell width="150px">CARD</TableCell>
            <TableCell width="100px">CASH</TableCell>
            <TableCell width="150px">TRANSFER</TableCell>
            <TableCell width="60px">INFO</TableCell>
            <TableCell width="100px" bg="rgb(196, 212, 255)">UNPUBLISH</TableCell>
            <TableCell width="100px" bg="rgb(196, 212, 255)">PUBLISHED</TableCell>
            <TableCell width="100px" bg="rgb(196, 212, 255)">SETTLED</TableCell>
            <TableRest>DETAIL</TableRest>
          </TableHead>
          <TableBody>
          </TableBody>
        </Table>
      </div>
    );
  }
}

class InvoiceDetail extends React.Component {

  render() {
    return (
      <div style={{ gridArea: "detail" }}>
        <Table>
          <TableTitle>
            INVOICE DETAIL (작업중)
          </TableTitle>
        </Table>
      </div>
    );
  }
}


/////////////////////////////////////////////////// Payment page


const PaymentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 400px;
  grid-template-areas:
    "invoice edit"
    "session edit"
    "extra edit";
`;

const MoneyTypeWrapper = styled(Flex)`
  flex-grow: 1;
  cursor: pointer;
  :hover {
    background: rgba(22,27,72,0.2);
  }
`;

class MoneyType extends React.Component<any> {

  render() {
    return (
      <TextfieldDialog
        onClose={this.props.updateDetails}
        title="Invoice detail"
        fields={["cash", "card", "transfer", "detail"]}
        placeholders={[`${this.props.amount}`, "0", "0", "detail"]}
        errorHandler={[
          () => false,
          () => false,
          () => false,
          () => false,
        ]}
        value={R.pick(["cash", "card", "transfer", "detail"], this.props.invoice)}
        types={["number", "number", "number", "text"]}
        component={(props) =>
          <MoneyTypeWrapper onClick={props.onClick}>
            {this.props.children}
          </MoneyTypeWrapper>
        } />
    );
  }
}


interface PaymentProps {
  sessions: any;
  invoices: any;
  extramoney: any;
  student: any;
}

interface PaymentState {
  selectedExtras: any;
  selectedSessions: any;
}

export class StudentPayment extends React.Component<any, PaymentState> {

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStudent(id);
    this.props.fetchInvoices(id);
    this.props.fetchSessions(id);
    this.props.fetchExtramoney(id);
  }

  componentWillReceiveProps(next) {
    const { id } = this.props.match.params;
    const { id: nextId } = next.match.params;
    if (id !== nextId) {
      this.props.fetchStudent(nextId);
      this.props.fetchInvoices(nextId);
      this.props.fetchSessions(nextId);
      this.props.fetchExtramoney(nextId);
      this.clearState();
    }
  }

  state = {
    selectedExtras: [],
    selectedSessions: [],
  }

  clearState = () => {
    this.setState({
      selectedExtras: [],
      selectedSessions: [],
    });

  }

  handleSelectExtra = (id: never) => {
    const selected = this.state.selectedExtras;
    if (selected.includes(id)) {
      this.setState({ selectedExtras: selected.filter(x => x !== id) });
    } else {
      this.setState({ selectedExtras: [id, ...selected] });
    }
  }

  handleSelectSession = (id: never) => {
    const selected = this.state.selectedSessions;
    if (selected.includes(id)) {
      this.setState({ selectedSessions: selected.filter(x => x !== id) });
    } else {
      this.setState({ selectedSessions: [id, ...selected] });
    }
  }

  createInvoice = (sessions, extras) => {
    this.props.createInvoice(sessions, extras);
  }

  updateInvoiceDetails = (id) => (payload) => {
    this.props.updateInvoice(id, payload);
  }

  render() {
    return (
      <PaymentWrapper>
        <PaymentInvoiceTable
          invoices={(this.props.invoices || []).filter(x => x.visible).filter(x => !x.published)}
          delete={this.props.deleteInvoice}
          updateDetails={this.updateInvoiceDetails}
        />
        <SessionTable
          sessions={(this.props.sessions || []).filter(x => parseInt(x.net) !== 0)}
          select={this.handleSelectSession}
          selected={this.state.selectedSessions}
          goto={this.props.history.push}
        />
        <ExtraTable
          create={(payload) => { this.props.createExtra({ student: selectn("id", this.props.student), ...payload }) }}
          delete={(id) => { this.props.deleteExtra(id) }}
          extras={(this.props.extramoney || []).filter(x => x.active)}
          select={this.handleSelectExtra}
          selected={this.state.selectedExtras}
        />
        <Edit
          sessions={(this.props.sessions || []).filter(x => this.state.selectedSessions.includes(selectn("id", x) as never))}
          extras={(this.props.extramoney || []).filter(x => this.state.selectedExtras.includes(selectn("id", x) as never))}
          selectSession={this.handleSelectSession}
          selectExtra={this.handleSelectExtra}
          createInvoice={this.createInvoice}
          clearSelection={this.clearState}
        />
      </PaymentWrapper>
    );
  }
}

class PaymentInvoiceTable extends React.Component<any> {

  publish = (id) => () => {
    if (window.confirm("Invoice를 publsh합니다. \n Publish된 invoice는 student > invoices에서 확인할 수 있습니다. \n Publish된 invoice는 Unpublish하기 이전엔 삭제할 수 없습니다.")) {
    }
  }

  viewDetails = (id) => async () => {
    const { payment, extramoney } = await getInvoiceReport(id);

    window.alert(`
      Invoice의 상세 내역입니다. (개발중)
      \n${payment.map(x => `${x.detail} : ${x.amount}`).join("\n")}
      \n${extramoney.map(x => `${x.detail} : ${x.amount}`).join("\n")}
    `);
  }

  render() {
    return (
      <div style={{ gridArea: "invoice" }}>
        <Table>
          <TableTitle>
            INVOICE (not published only)
          </TableTitle>
          <TableHead>
            <TableCell width="50px">IID</TableCell>
            <TableCell width="100px">AMOUNT</TableCell>
            <TableCell width="100px">CARD</TableCell>
            <TableCell width="100px">CASH</TableCell>
            <TableCell width="100px">TRANSFER</TableCell>
            <TableRest>DETAIL</TableRest>
            <TableCell width="60px">INFO</TableCell>
            <TableCell width="80px" bg="rgb(196, 212, 255)">PUBLISH</TableCell>
            <TableCell width="44px"></TableCell>
          </TableHead>
          <TableBody>
            {this.props.invoices.map((v: any, i: any) =>
              <TableRow key={i}>
                <TableCell width="50px">{selectn("id", v)}</TableCell>
                <TableCell width="100px">{selectn("amount", v)}</TableCell>
                <MoneyType updateDetails={this.props.updateDetails(selectn("id", v))} invoice={v}>
                  <TableCell width="100px" style={{ flexGrow: 0 }}>{selectn("card", v)}</TableCell>
                  <TableCell width="100px" style={{ flexGrow: 0 }}>{selectn("cash", v)}</TableCell>
                  <TableCell width="100px" style={{ flexGrow: 0 }}>{selectn("transfer", v)}</TableCell>
                  <TableRest style={{ flexGrow: 1 }}>{selectn("detail", v)}</TableRest>
                </MoneyType>
                <TableCell width="60px" hover cursor="pointer" justifyContent="center"
                  onClick={this.viewDetails(selectn("id", v))}>
                  <ViewListButton />
                </TableCell>
                <TableCell
                  hover cursor="pointer" width="80px" bg="rgb(196, 212, 255)" justifyContent="center"
                  onClick={this.publish(selectn("id", v))}>
                  <SendButton />
                </TableCell>
                <TableDelete onClick={() => this.props.delete(selectn("id", v))} />
              </TableRow>
            )}
            <Hr />
          </TableBody>
        </Table>
      </div>
    );
  }
}

class SessionTable extends React.Component<any> {

  render() {
    return (
      <div style={{ gridArea: "session" }}>
        <Table>
          <TableTitle>
            SESSIONS (need to be paid or refunded only)
          </TableTitle>
          <TableHead>
            <TableCell width="44px" bg="rgb(196, 212, 255)"></TableCell>
            <TableCell width="50px">SID</TableCell>
            <TableCell width="120px">NET</TableCell>
            <TableCell width="150px">CHARGED</TableCell>
            <TableCell width="120px">PAID</TableCell>
            <TableCell width="150px">COURSE</TableCell>
            <TableCell width="50px">AT</TableCell>
            <TableCell width="50px">D/C</TableCell>
            <TableRest>SCHEDULE</TableRest>
          </TableHead>
          <TableBody>
            {this.props.sessions.map((v: any, i: any) =>
              <TableRow key={i}>
                <TableCheckBox
                  onClick={() => { this.props.select((selectn("id", v))); }}
                  checked={this.props.selected.includes(selectn("id", v))} />
                <TableCell width="50px">{selectn("id", v)}</TableCell>
                <TableCell width="120px">{selectn("net", v)}</TableCell>
                <TableCell width="150px">{selectn("charged", v)}</TableCell>
                <TableCell width="120px">{selectn("paid", v)}</TableCell>
                <TableCell width="150px"
                  hover
                  cursor="pointer"
                  onClick={() => {
                    const course = selectn("Course.id", v);
                    if (course) {
                      this.props.goto(`/course/${course}/overview`);
                    }
                  }}>
                  {selectn("Course.name", v)}
                </TableCell>
                <TableCell width="50px">{selectn("attendance", v)}/{selectn("Schedule.time", v)}</TableCell>
                <TableCell width="50px">{selectn("discount", v)}</TableCell>
                <TableRest
                  hover
                  cursor="pointer"
                  onClick={() => {
                    const course = selectn("Course.id", v);
                    const schedule = selectn("Schedule.id", v);
                    if (course && schedule) {
                      this.props.goto(`/course/${course}/schedules/${schedule}`);
                    }
                  }}>
                  {selectn("Schedule.date", v)}
                </TableRest>
              </TableRow>
            )}
          </TableBody>
          <Hr />
        </Table>
      </div>
    );
  }
}

class ExtraTable extends React.Component<any> {

  render() {
    return (
      <div style={{ gridArea: "extra" }}>
        <Table>
          <TableTitle>
            EXTRA MONEY (coupons, extra billings ...)
          </TableTitle>
        </Table>
        <TableHead>
          <TableCell width="44px" bg="rgb(196, 212, 255)"></TableCell>
          <TableCell width="50px">EID</TableCell>
          <TableCell width="150px">AMOUNT</TableCell>
          <TableRest>DETAIL</TableRest>
          <TableCell width="44px"></TableCell>
        </TableHead>
        <TableBody>
          {this.props.extras.map((v: any, i: any) =>
            <TableRow key={i}>
              <TableCheckBox
                onClick={() => { this.props.select((selectn("id", v))); }}
                checked={this.props.selected.includes(selectn("id", v))} />
              <TableCell width="50px">{selectn("id", v)}</TableCell>
              <TableCell width="150px">{selectn("amount", v)}</TableCell>
              <TableRest>{selectn("detail", v)}</TableRest>
              <TableDelete onClick={() => {
                // 선택되어있는데 삭제하면 버그가 발생할 수 있음 BUGGY
                this.props.delete(selectn("id", v))
              }} />
            </TableRow>
          )}
        </TableBody>
        <Hr />
        <TextfieldDialog
          onClose={this.props.create}
          title="Create New Invoice"
          fields={["amount", "detail"]}
          placeholders={["10000", "write some descriptions"]}
          errorHandler={[
            money => (parseInt(money) == 0),
            () => false,
          ]}
          types={["number", "text"]}
          component={(props) =>
            <TableCreate onClick={props.onClick}>
              <Text>
                + EXTRA MONEY
              </Text>
            </TableCreate>
          } />
      </div>
    );
  }
}

const PaymentDetail = styled.input`
  outline: none;
  height: 28px;
  width: 100%;
  border: none;
  background: inherit;
`;

class Edit extends React.Component<any> {

  state = {
    details: {},
  }

  componentWillReceiveProps(nextProps) {
    const { sessions: current } = this.props;
    const { sessions: next } = nextProps;
    if (current.length < next.length) { // 추가
      const session: any = R.differenceWith((x: any, y: any) => x.id === y.id, next, current)[0];
      this.setState({ details: { ...this.state.details, [session.id]: session.charged > 0 ? "tuition fee" : "refund" } });
    } else if (current.length > next.length) { // 삭제
      const session: any = R.difference(current.map(x => x.id), next.map(x => x.id))[0];
      this.setState({ details: R.omit([session], this.state.details) });
    }
  }

  handleChange = (id) => (e) => {
    this.setState({
      details: {
        ...this.state.details,
        [id]: e.target.value
      }
    });
  }

  handleCreate = () => {
    const sessions = Object.entries({ ...this.state.details });
    const extras = [...this.props.extras].map(x => x.id);

    this.props.clearSelection();
    this.props.createInvoice(sessions, extras);
  }

  render() {
    return (
      <>
        <div style={{ gridArea: "edit", borderLeft: "1px solid rgba(22,27,72,0.1)" }}>
          <Table>
            <TableTitle>
              CREATE INVOICE
            </TableTitle>
            <TableHead>
              <TableCell width="50px">ID</TableCell>
              <TableCell width="120px">AMOUNT</TableCell>
              <TableRest>DETAIL</TableRest>
              <TableCell width="44px"></TableCell>
            </TableHead>
            <TableBody height="calc(100vh - 128px)">
              {this.props.sessions.map((v, i) =>
                <TableRow key={i}>
                  <TableCell width="50px">{selectn("id", v)}</TableCell>
                  <TableCell width="120px">{selectn("net", v)}</TableCell>
                  <TableRest>
                    <PaymentDetail value={this.state.details[selectn("id", v)]} onChange={this.handleChange(selectn("id", v))} />
                  </TableRest>
                  <TableDelete onClick={() => { this.props.selectSession((selectn("id", v))); }} />
                </TableRow>
              )}{this.props.extras.map((v, i) =>
                <TableRow key={i}>
                  <TableCell width="50px">{selectn("id", v)}</TableCell>
                  <TableCell width="120px">{selectn("amount", v)}</TableCell>
                  <TableRest>{selectn("detail", v)}</TableRest>
                  <TableDelete onClick={() => { this.props.selectExtra((selectn("id", v))); }} />
                </TableRow>
              )}
              <Hr />
            </TableBody>
            <TableRow>
              <Flex style={{ flexGrow: 1 }}>
                <Text ml="8px" medium>Total</Text>
                <Text ml="auto" mr="8px" medium>₩ {
                  [...this.props.sessions.map(x => x.net), ...this.props.extras.map(x => x.amount)].reduce((acc, n) => acc + n, 0)
                }</Text>
              </Flex>
            </TableRow>
            <TableCreate onClick={this.handleCreate}>
              <Text>
                + INVOICE
              </Text>
            </TableCreate>
          </Table>
        </div>
      </>
    );
  }
}
