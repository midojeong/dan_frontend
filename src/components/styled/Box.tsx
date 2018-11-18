import styled from "styled-components";
import {
  space,
  SpaceProps,
  width,
  WidthProps,
  height,
  HeightProps,
  color,
  ColorProps,
  justifySelf,
  JustifySelfProps,
  alignSelf,
  AlignSelfProps,
  order,
  OrderProps,
  flex,
  FlexProps,
} from "styled-system";

type Props = SpaceProps & WidthProps & HeightProps & ColorProps & JustifySelfProps & AlignSelfProps & OrderProps & FlexProps;

export const Box = styled.div<Props>`
  box-sizing: border-box;
  ${space}
  ${width}
  ${height}
  ${color}
  ${justifySelf}
  ${alignSelf}
  ${order}
  ${flex}
  transition: all 0.15s ease-out;
`;
