import * as React from "react";
import styled from "styled-components";
import { Text, Flex, theme } from "./styled";


const Wrapper = styled.div<any>`
   width: 100vw;
   height: 100vh;
   display: flex;
`;

const Sidebar = styled.div`
  flex: 0 0 200px;
  height: 100%;
  border-right: 1px solid rgba(22, 27, 72, 0.08);
`;

const MenuWrapper = styled(Flex) <any>`
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(22,27,72,0.08);
  :hover {
    background: rgba(22,27,72,0.1);
    > p {
      color: ${theme.colors.blue.deep};
    }
  }
  > p {
    font-weight: ${props => props.bold ? "600" : "400"};
  }
  background: ${props => props.current ? "rgba(22,27,72,0.3)" : "none"};
`;

const barColor: any = {
  course: "hsl(0, 100%, 80%)",
  student: "hsl(50, 100%, 80%)",
  teacher: "hsl(100, 100%, 80%)",
  invoice: "hsl(150, 100%, 80%)",
};

const Bar = styled.div<any>`
  height: 100%;
  width: 8px;
  background: ${props => barColor[props.type]};
`;

const Menu = (props: any) => {
  const { type, label, ...rest } = props;
  return (
    <MenuWrapper {...rest}>
      <Bar type={type} />
      <Text ml={2}>{label}</Text>
    </MenuWrapper>
  );
}

const routeTest = (pathname: string, regex: RegExp): boolean => regex.test(pathname);

const grid = (path: string) => {
  if (
    routeTest(path, /^\/course\/list$/) ||
    routeTest(path, /^\/student\/list$/) ||
    routeTest(path, /^\/teacher\/list$/) ||
    routeTest(path, /^\/invoice\/list$/)
  ) {
    return "calc(100vw - 600px) 400px";
  } else {
    return "300px calc(100vw - 500px)";
  }
}

const GridWrapper = styled.div<any>`
  display: grid;
  grid-template-columns: ${props => grid(props.path)};
  height: 100%;
  grid-template-areas: "list main";
`;

const Grid = (props: any) => {
  return (
    <GridWrapper path={props.path}>{props.children}</GridWrapper>
  );
}

export class Layout extends React.Component<any, any> {

  renderSidebar = () => {
    const { pathname } = this.props.history.location;
    const goto = this.props.history.push;
    return (
      <Sidebar>
        <Menu
          bold
          label="Course List"
          type="course"
          current={routeTest(pathname, /^\/course\/list$/)}
          onClick={() => goto("/course/list")} />
        <Menu
          label="Overview"
          type="course"
          current={routeTest(pathname, /^\/course\/\d+\/overview$/)}
          onClick={() => {
            if (routeTest(pathname, /^\/course\/\d+/)) {
              goto(pathname.replace(/\/course\/(\d+).*/, "/course/$1/overview"));
            } else {
              goto("/course/0/overview");
            }
          }} />
        <Menu
          label="Schedules"
          type="course"
          current={routeTest(pathname, /^\/course\/\d+\/schedules/)}
          onClick={() => {
            if (routeTest(pathname, /^\/course\/\d+/)) {
              goto(pathname.replace(/\/course\/(\d+).*/, "/course/$1/schedules"));
            } else {
              goto("/course/0/schedules");
            }
          }} />
        <Menu
          label="Today's course"
          type="course"
          current={routeTest(pathname, /^\/course\/today$/)}
          onClick={() => goto("/course/today")} />
        <Menu
          bold
          label="Student List"
          type="student"
          current={routeTest(pathname, /^\/student\/list$/)}
          onClick={() => goto("/student/list")} />
        <Menu
          label="Overview"
          type="student"
          current={routeTest(pathname, /^\/student\/\d+\/overview$/)}
          onClick={() => {
            if (routeTest(pathname, /^\/student\/\d+/)) {
              goto(pathname.replace(/\/student\/(\d+).*/, "/student/$1/overview"));
            } else {
              goto("/student/0/overview");
            }
          }} />
        <Menu
          label="Invoices"
          type="student"
          current={routeTest(pathname, /^\/student\/\d+\/invoice/)}
          onClick={() => {
            if (routeTest(pathname, /^\/student\/\d+/)) {
              goto(pathname.replace(/\/student\/(\d+).*/, "/student/$1/invoice"));
            } else {
              goto("/student/0/invoice");
            }
          }} />
        <Menu
          label="Payments"
          type="student"
          current={routeTest(pathname, /^\/student\/\d+\/payment/)}
          onClick={() => {
            if (routeTest(pathname, /^\/student\/\d+/)) {
              goto(pathname.replace(/\/student\/(\d+).*/, "/student/$1/payment"));
            } else {
              goto("/student/0/payment");
            }
          }} />
        <Menu
          bold
          label="Teacher List"
          type="teacher"
          current={routeTest(pathname, /^\/teacher\/list$/)}
          onClick={() => goto("/teacher/list")} />
        <Menu
          label="Overview"
          type="teacher"
          current={routeTest(pathname, /^\/teacher\/\d+\/overview$/)}
          onClick={() => {
            if (routeTest(pathname, /^\/teacher\/\d+/)) {
              goto(pathname.replace(/\/teacher\/(\d+).*/, "/teacher/$1/overview"));
            } else {
              goto("/teacher/0/overview");
            }
          }} />
        <Menu
          bold
          label="Invoice List"
          type="invoice"
          current={routeTest(pathname, /^\/invoice\/list$/)}
          onClick={() => goto("/invoice/list")} />
        <Menu
          label="Detail"
          type="invoice"
          current={routeTest(pathname, /^\/invoice\/\d+\/detail$/)}
          onClick={() => {
            if (routeTest(pathname, /^\/invoice\/\d+/)) {
              goto(pathname.replace(/\/invoice\/(\d+).*/, "/invoice/$1/detail"));
            } else {
              goto("/invoice/0/detail");
            }
          }} />
      </Sidebar>
    );
  }

  render() {
    return (
      <Wrapper>
        {this.renderSidebar()}
        <Grid path={this.props.history.location.pathname}>
          {this.props.children}
        </Grid>
      </Wrapper>
    );
  }
}
