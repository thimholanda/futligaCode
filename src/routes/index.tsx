/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import {useAuth} from '../hooks/auth';
import Loading from '../components/Loading';

const Routes: React.FC = () => {
  const {user, loading} = useAuth();

  if (loading) {
    return <Loading />;
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
