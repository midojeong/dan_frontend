import * as React from "react";
import styled, { css } from "styled-components";
import { Text, Flex } from "./styled";
import { DeleteButton } from "./Icon";
import { CheckButton } from "./Icon";

export const TableCell = styled<any>(Flex)`
  flex-shrink: 0;
  flex-grow: 0;
  border-right: 1px solid rgba(22,27,72, 0.18);
  align-items: center;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  padding: 0 4px 0 4px;
  ${props => props.cursor ? "cursor: " + props.cursor + ";" : ""}
  :hover {
    ${props => props.hover ? "background: rgba(22,27,72,0.2);" : ""}
  }
`;

const hover = css`
  :hover {
    background: rgba(22,27,72,0.2);
  }
`;

export const Table = styled.div`
`;

export const TableBody = styled.div<any>`
  &> :nth-child(odd) {
    background: none;
  }

  &> :nth-child(even) {
    background: rgba(22,27,72,0.05);
  }
  overflow: scroll;
  max-height: ${props => props.maxHeight};
  height: ${props => props.height};

  ::-webkit-scrollbar {
      display: none;  // Safari and Chrome
  }
`;

export const TableRow = styled<any>(Flex)`
  flex: 1;
  height: 32px;
  background: ${props => props.current ? "hsl(200, 100%, 80%) !important" : "inherit"};
`;

export const TableId = styled<any>(TableCell)`
  justify-content: center;
  width: 50px;
`;

export const TableHead = styled(Flex)`
  flex: 1;
  height: 32px;
  background: rgba(22,27,72,0.2) !important;
`;

export const TableTitle = styled(Flex)`
  flex: 1;
  height: 32px;
  padding-left: 16px;
  align-items: center;
  font-weight: 600;
  background: rgba(22,27,72,0.4) !important;
`;

export const TableName = styled<any>(TableCell)`
  width: 250px;
`;

export const TableEntity = styled<any>(TableCell)`
  width: 150px;
  cursor: pointer;
  ${hover}
`;

export const TableDelete = (props: any) => {
  return (
    <Flex alignItems="center" justifyContent="center" style={{ flexShrink: 0 }} width="x">
      <DeleteButton onClick={props.onClick} />
    </Flex>
  );
};

export const TableRest = styled.div<any>`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 4px 0 4px;
  overflow: hidden;
  white-space: nowrap;
  border-right: 1px solid rgba(22,27,72, 0.18);
  ${props => props.cursor ? "cursor: " + props.cursor + ";" : ""}
  :hover {
    ${props => props.hover ? "background: rgba(22,27,72,0.2);" : ""}
  }
`;

export const TableMoney = styled<any>(TableCell)`
  width: 100px;
`;

export const TableCreate = styled.div<any>`
  height: 32px;
  display: flex;
  flex: 0;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: hsla(200, 100%, 80%, 0.2);
  box-shadow: 0px 0px 4px 0px rgba(22,27,72,0.6);
  cursor: pointer;
  :hover {
    background: hsla(200, 100%, 80%, 0.5);
  }
`;

export const TableCheckBox = (props) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      width="44px"
      style={{ cursor: "pointer", flexShrink: 0, borderRight: "1px solid rgba(22,27,72,0.18)" }}
      onClick={props.onClick}
      bg={props.checked ? "hsl(200,100%,80%)" : "none"}>
      {props.checked ? <CheckButton /> : null}
    </Flex>
  );
}
