import React from 'react';
import {Container} from './styles';

const MainView: React.FC = ({children, ...rest}) => {
  return (
    <Container forceInset={{bottom: 'never'}} {...rest}>
      {children}
    </Container>
  );
};

export default MainView;
