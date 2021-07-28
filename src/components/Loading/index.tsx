import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const Loading: React.FC = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#717e7f" />
    </View>
  );
};

export default Loading;
