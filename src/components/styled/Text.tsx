import styled from "styled-components";
import {
  fontSize,
  FontSizeProps,
  fontFamily,
  FontFamilyProps,
  space,
  SpaceProps,
  color,
  ColorProps,
  textAlign,
  TextAlignProps,
  letterSpacing,
  LetterSpacingProps,
  lineHeight,
  LineHeightProps,
  height,
  HeightProps,
  width,
  WidthProps,
  flex,
  FlexProps,
} from "styled-system";
import { fontWeights } from "./theme";

interface Props {
  caps?: boolean;
  medium?: boolean;
  regular?: boolean;
  demiLight?: boolean;
  light?: boolean;
  italic?: boolean;
  left?: boolean;
  right?: boolean;
  center?: boolean;
  underline?: boolean;
  through?: boolean;
  hoverColor?: string;
}

type TextProps =
  FontSizeProps &
  FontFamilyProps &
  ColorProps &
  SpaceProps &
  TextAlignProps &
  LetterSpacingProps &
  LineHeightProps &
  HeightProps &
  WidthProps &
  FlexProps &
  Props;

const caps = ({ caps }: Props) =>
  caps ? { textTransform: "uppercase" } : null;
const medium = ({ medium }: Props) =>
  medium ? { fontWeight: `${fontWeights.medium}` } : null;
const regular = ({ regular }: Props) =>
  regular ? { fontWeight: `${fontWeights.regular}` } : null;
const demiLight = ({ demiLight }: Props) =>
  demiLight ? { fontWeight: `${fontWeights.demiLight}` } : null;
const light = ({ light }: Props) =>
  light ? { fontWeight: `${fontWeights.light}` } : null;
const italic = ({ italic }: Props) => (italic ? { fontStyle: "italic" } : null);
const left = ({ left }: Props) => (left ? { textAlign: "left" } : null);
const right = ({ right }: Props) => (right ? { textAlign: "right" } : null);
const center = ({ center }: Props) => (center ? { textAlign: "center" } : null);
const underline = ({ underline }: Props) =>
  underline ? { textDecorationLine: "underline" } : null;
const through = ({ through }: Props) =>
  through ? { textDecorationLine: "line-through" } : null;
const hoverColor = ({ hoverColor }: Props) =>
  hoverColor ? { color: hoverColor } : null;

export const Text = styled.div<TextProps>`
  overflow-wrap: break-word;
  hyphens: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  ${caps}
  ${medium}
  ${regular}
  ${demiLight}
  ${light}
  ${italic}
  ${left}
  ${right}
  ${center}
  ${underline}
  ${through}
  ${color}
  ${space}
  ${fontSize}
  ${fontFamily}
  ${textAlign}
  ${letterSpacing}
  ${lineHeight}
  ${height}
  ${flex}
  ${width}
  :hover {
   ${hoverColor}
  }
`.withComponent("p");

Text.defaultProps = {
  color: "black.standard",
  fontSize: "h4",
  left: true,
  lineHeight: "1.4em"
};
