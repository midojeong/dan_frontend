import React from "react";
import { Flex, Text, Box } from "../components/styled";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { reset } from "../apis/CommonAPI";

export class HomePage extends React.Component<any> {

  render() {
    return (
      <div>
        <Flex mt={3} ml={3}>
          <Button variant="outlined" color="secondary" onClick={() => { reset() }}>Reset Database</Button>
        </Flex>
      </div>
    );
  }
}
