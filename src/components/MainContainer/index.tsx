import React from 'react';
import {Container} from './styles';

const MainContainer: React.FC = ({children, ...rest}) => {
  return <Container {...rest}>{children}</Container>;
};

export default MainContainer;
