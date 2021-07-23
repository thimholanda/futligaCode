import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {css} from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  padding: 0 16px;
  background: rgba(255, 255, 255, 0.4);
  border-width: 1px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.7);
  justify-content: center;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;

  ${(props: ContainerProps) => {
    if (!props.isErrored && props.isFocused) {
      return css`
        border-color: #00d67c;
        border-width: 1px;
      `;
    }
  }}

  ${props =>
    props.isErrored &&
    css`
      border-color: #ef2929;
      border-width: 1px;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  font-family: 'Oswald-Regular';
  color: #535454;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
