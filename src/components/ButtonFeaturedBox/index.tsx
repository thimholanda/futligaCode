import React from 'react';
import {
  Button,
  ButtonBackground,
  Container,
  ContainerButton,
  TextContainer,
  TextBackground,
  Title,
  Content,
  IContainerProps,
  IContainerButtonProps,
} from './styles';

import imgBg from '../../assets/bg.png';
import imgBgText from '../../assets/bg-text.png';
import {ViewProps} from 'react-native';

interface Props extends IContainerProps, IContainerButtonProps, ViewProps {
  title: string;
  children?: React.ReactNode;
  onPress?(): void;
}

export function ButtonFeaturedBox({
  marginTo,
  aspectRatio,
  title,
  isHalf,
  children,
  onPress,
  ...rest
}: Props) {
  return (
    <Container isHalf={isHalf} aspectRatio={aspectRatio} {...rest}>
      <ContainerButton marginTo={marginTo}>
        <Button onPress={onPress}>
          <ButtonBackground source={imgBg} />
          <TextContainer>
            <TextBackground source={imgBgText} />
            <Title>{title}</Title>
          </TextContainer>
          <Content>{children}</Content>
        </Button>
      </ContainerButton>
    </Container>
  );
}
