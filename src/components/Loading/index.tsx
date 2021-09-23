import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Container, styles} from './styles';

const Loading: React.FC = () => {
  return (
    <Container style={styles.container}>
      <ActivityIndicator size="large" color="#717e7f" />
    </Container>
  );
};

export default Loading;
