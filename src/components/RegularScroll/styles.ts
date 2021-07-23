import styled, {css} from 'styled-components/native';

interface ScrollProps {
  color?: string;
}

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {paddingHorizontal: 12, paddingVertical: 12},
  showsVerticalScrollIndicator: false,
})<ScrollProps>`
  ${props =>
    props.color &&
    css`
      background-color: ${props.color};
    `}
`;
