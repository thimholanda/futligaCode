import React from 'react';
import {
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
  isTitleCenter?: boolean;
  borderRadius?: number;
}

export function FeaturedBox({
  marginTo,
  aspectRatio,
  title,
  isHalf,
  children,
  isTitleCenter,
  ...rest
}: Props) {
  return (
    <Container isHalf={isHalf} aspectRatio={aspectRatio} {...rest}>
      <ContainerButton marginTo={marginTo}>
        <ButtonBackground source={imgBg} />
        <TextContainer>
          <TextBackground source={imgBgText} />
          {isTitleCenter ? (
            <Title style={{marginLeft: 110}}>{title}</Title>
          ) : (
            <Title>{title}</Title>
          )}
        </TextContainer>
        <Content>{children}</Content>
      </ContainerButton>
    </Container>
  );
}
