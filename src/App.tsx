import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

import AppProvider from './hooks';
import Routes from './routes';

import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();

const App = () => (
  <NavigationContainer>
    <AppProvider>
      <Routes />
    </AppProvider>
  </NavigationContainer>
);

export default App;
