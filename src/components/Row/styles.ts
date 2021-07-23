import styled, {css} from 'styled-components/native';

export interface IContainerProps {
  marginType?: 'start' | 'middle' | 'end';
}

export const Container = styled.View<IContainerProps>`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  ${props => {
    switch (props.marginType) {
      case 'start':
        return css`
          margin-top: 10px;
        `;
      case 'middle':
        return css`
          margin: 10px 0;
        `;
      case 'end':
        return css`
          margin-bottom: 10px;
        `;
    }
  }}
`;
