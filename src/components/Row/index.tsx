import React from 'react';
import {ViewProps} from 'react-native';
import {Container, IContainerProps} from './styles';

interface Props extends IContainerProps, ViewProps {
  children: React.ReactNode;
}

export function Row({children, marginType, ...rest}: Props) {
  return (
    <Container marginType={marginType} {...rest}>
      {children}
    </Container>
  );
}
