import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {

    const { user, loading, token } = useAuth();
    
    if(loading){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#999"></ActivityIndicator>
            </View>
        );
    }

    return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes; 