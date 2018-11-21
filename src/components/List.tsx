import * as React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  grid-area: list;
  border-right: 1px solid rgba(22,27,72, 0.08);
  overflow-x: hidden;
`;

export class List extends React.Component<any, any> {

  render() {
    return (
      <Wrapper>
        {this.props.children}
      </Wrapper>
    );
  }
}
