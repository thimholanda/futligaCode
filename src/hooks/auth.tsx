import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import { Alert } from 'react-native';

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: object;
    loading: boolean;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
    token: string;
}

interface AuthState {
    token: string;
    user: object;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    
    const [data, setData] = useState<AuthState>({} as AuthState);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadStorageData(): Promise<void>{

            const [token, user] = await AsyncStorage.multiGet([
                '@futLiga:token',
                '@futLiga:user'
            ]);

            if(token[1] && user[1]){
                setData({token: token[1], user: JSON.parse(user[1])})
            };
        }

        setLoading(false);

        loadStorageData();
    }, []);

    const signIn = useCallback(async ({ email, password }) => {
        
        const response = await api.post('/Token/Request', {
            email,
            password,
        });

        const { token } = response.data;

        const user = {
            id: '8557',
            name: 'Usuario 8557',
            nickname: 'Usuario 8557',
            email: 'usuario8557@futliga.com.br',
            avatar: 'http://teste.futliga.com.br/imagens/distintivos/8557-v01.png'
        }

        await AsyncStorage.multiSet([
            ['@futLiga:token', token],
            ['@futLiga:user', JSON.stringify(user)]
        ]);

        //todo: remover verificação do token. Usar somente usuário no setData.
        if(!!token){
            setData({ token, user });
        }else{
            throw new Error();
        }

    }, []);

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove(
                [
                    '@futLiga:token',
                    '@futLiga:user'

                ]
            );
        
        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading, token: data.token }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used whitin an AuthProvider');
    }
    return context;
}
