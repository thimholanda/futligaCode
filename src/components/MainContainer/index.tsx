import React from 'react';
import {Container, styles} from './styles';

const MainContainer: React.FC = ({children, ...rest}) => {
  return (
    <Container style={styles.container} {...rest}>
      {children}
    </Container>
  );
};

export default MainContainer;
