import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import ScheduleGame from '../pages/ScheduleGame';
import CalendarGame from '../pages/CalendarGame';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#717e7f'},
    }}>
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="ScheduleGame" component={ScheduleGame} />
    <App.Screen name="CalendarGame" component={CalendarGame} />
  </App.Navigator>
);

export default AppRoutes;
