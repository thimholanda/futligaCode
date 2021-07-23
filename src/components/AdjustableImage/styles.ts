import styled from 'styled-components/native';

export interface IContainerProps {
  size?: string | undefined;
}

export const Container = styled.Image<IContainerProps>`
  width: ${props => (props.size ? props.size : '100%')};
  height: ${props => (props.size ? props.size : '100%')};
  align-self: center;
`;
