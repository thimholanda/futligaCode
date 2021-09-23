import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import CalendarGame from '../pages/CalendarGame';
import ScheduleGame from '../pages/ScheduleGame';
import ScheduleGameInfo from '../pages/ScheduleGameInfo';
import InviteGame from '../pages/InviteGame';
import RodadaFutLiga from '../pages/RodadaFutLiga';
import RankingPage from '../pages/RankingPage';

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
    <App.Screen name="ScheduleGameInfo" component={ScheduleGameInfo} />
    <App.Screen name="InviteGame" component={InviteGame} />
    <App.Screen name="RodadaFutLiga" component={RodadaFutLiga} />
    <App.Screen name="Ranking" component={RankingPage} />
  </App.Navigator>
);

export default AppRoutes;
