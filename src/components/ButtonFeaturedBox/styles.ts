import styled, {css} from 'styled-components/native';

export interface IContainerButtonProps {
  marginTo?: 'left' | 'right';
}

export interface IContainerProps {
  aspectRatio: number;
  isHalf?: boolean;
}

export const Container = styled.View<IContainerProps>`
  width: ${props => (props.isHalf ? '50%' : '100%')};
  aspect-ratio: ${props => props.aspectRatio};
  overflow: hidden;
`;

export const ContainerButton = styled.View<IContainerButtonProps>`
  flex: 1;
  ${props => {
    if (props) {
      switch (props.marginTo) {
        case 'left':
          return css`
            margin-left: 5px;
          `;
        case 'right':
          return css`
            margin-right: 5px; ;
          `;
      }
    }
  }};
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  background-color: white;
  position: relative;
`;

export const ButtonBackground = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const TextContainer = styled.View`
  height: 40px;
  width: 100%;
  justify-content: center;
  padding: 0 10px;
  position: relative;
  overflow: hidden;
`;

export const TextBackground = styled.Image`
  position: absolute;
  height: 100px;
  bottom: 0;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #029e57;
  font-family: 'Oswald-Regular';
`;

export const Content = styled.View`
  flex: 1;
  justify-content: space-around;
`;
