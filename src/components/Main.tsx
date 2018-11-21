import * as React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  grid-area: main;
`;

export class Main extends React.Component<any, any> {

  render() {
    return (
      <Wrapper>
        {this.props.children}
      </Wrapper>
    );
  }
}
