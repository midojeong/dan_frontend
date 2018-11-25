import * as React from "react";
import styled from "styled-components";
import { EditButton } from "./Icon";
import { Flex, Text, Box, Input } from "./styled";
import { Picker } from "./Dialogs";

const EditInput = styled<any>(Input)`
   width: ${props => props.width} !important;
   height: 28px !important;
   margin-left: -16px;
   font-size: 16px;
   color: rgba(22,27,72,0.8);
`;

export class EditField extends React.Component<any> {

  state = {
    edit: false,
    value: "",
  }

  handleClick = () => {
    this.setState({ edit: true, value: this.props.value });
  }

  handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      this.handleSubmit(e);
    }
  }

  handleBlur = () => {
    this.setState({ edit: false, value: "" });
  }

  handleChange = (e: any) => {
    this.setState({ value: e.target.value });
  }

  handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await this.props.handleSubmit(this.state.value);
    } catch (err) {
      // TODO 에러처리
    }
    this.setState({ value: "", edit: false });
  }

  renderSubmitButton = () => {
    return (
      <Box onMouseDown={this.handleSubmit} ml={2} style={{ cursor: "pointer" }}>
        <Text hoverColor="rgba(68,72,223,0.8)" style={{ transition: "color 0.15s ease-out" }}>저장하기</Text>
      </Box>
    );
  }

  render() {
    return (
      <Flex alignItems="center" ml={3}>
        <Text fontSize="14px" mr={3} style={{ minWidth: (this.props.titleWidth || "95px") }}>{this.props.type}</Text>
        {this.state.edit ?
          <>
            <EditInput
              width={this.props.width || "150px"}
              value={this.state.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              onKeyPress={this.handleKeyPress} />
            {this.renderSubmitButton()}
          </>
          : <>
            <Text>{this.props.value}</Text>
            <EditButton onClick={this.handleClick} style={{ color: "rgba(22,27,72,0.3)" }} />
          </>}
      </Flex>
    );
  }
}

const DetailInput = styled.textarea<any>`
   width: ${props => props.width} !important;
   height: ${props => props.height} !important;
   font-size: 16px;
   color: rgba(22,27,72,0.8);
   margin-left: 32px;
   margin-top: 32px;
   outline: none;
   resize: none;
   padding: 16px;
   border: none;
   background: rgba(22,27,72,0.04);
   border-radius: 8px;
`;

export class DetailField extends React.Component<any> {

  state = {
    value: "",
  };

  handleBlur = () => {
    this.props.handleSubmit(this.state.value);
  }

  handleChange = (e: any) => {
    this.setState({ value: e.target.value });
  }

  componentWillReceiveProps(next: any) {
    const { fetchedValue } = next;
    const { value } = this.state;
    if (value !== fetchedValue) {
      this.setState({ value: fetchedValue });
    }
  }

  render() {
    return (
      <DetailInput
        width={this.props.width || "70%"}
        height={this.props.height || "150px"}
        value={this.state.value || ""}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    );
  }
}

export class PickerField extends React.Component<any> {

  render() {
    return (
      <Flex alignItems="center" ml={3}>
        <Text fontSize="14px" mr={3} style={{ minWidth: (this.props.titleWidth || "95px") }}>{this.props.type}</Text>
        <Text>{this.props.value}</Text>
        <Picker
          onClose={this.props.handleSubmit}
          fetch={this.props.fetch}
          type={this.props.table}
          component={(props) =>
            <EditButton onClick={props.onClick} style={{ color: "rgba(22,27,72,0.3)" }} />
          } />
      </Flex>
    );
  }
}
