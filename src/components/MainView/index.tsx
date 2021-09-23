import React from 'react';
import {Container, styles} from './styles';

const MainView: React.FC = ({children}) => {
  return (
    <Container
      style={styles.container}
      forceInset={{top: 'never', bottom: 'never'}}>
      {children}
    </Container>
  );
};

export default MainView;
