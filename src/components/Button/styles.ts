import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export type ButtonTypeStyleProps = "PRIMARY" | "SECONDARY" | "DISABLED";

type Props = {
  type: ButtonTypeStyleProps;
}

export const Container = styled(TouchableOpacity)<Props>`
  flex:1;
  min-height: 56px;
  max-height: 56px;

  background-color: ${({ theme, type }) => type === "PRIMARY" ? theme.COLORS.GREEN_700 : type === "SECONDARY" ? theme.COLORS.RED_DARK : theme.COLORS.GRAY_200};
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`;


export const Title  = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.WHITE};
`