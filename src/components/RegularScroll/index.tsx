import React from 'react';
import {Container} from './styles';

interface RegularScrollProps {
  color?: string | undefined;
}

const RegularScroll: React.FC<RegularScrollProps> = ({
  children,
  color,
  ...rest
}) => {
  return (
    <Container color={color} {...rest}>
      {children}
    </Container>
  );
};

export default RegularScroll;
