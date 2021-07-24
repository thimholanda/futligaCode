import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import {Authorization} from '../services/api';
import {DomainService, TokenService} from '../services';

interface SignInCredentials {
  email: string;
  password: string;
}

export interface Equipe {
  distintivo: string;
  id: string;
  nomeApresentacao: string;
  nomeCompleto: string;
  nomeConta: string;
  situacaoCadastral: string;
}

interface User {
  apelido: string;
  email: string;
  equipesQueAdministra: Array<Equipe>;
  foto: string;
  id: string;
  isAdmin: boolean;
  nomeCompleto: string;
  tipo: string;
}

interface AuthContextData {
  user: User;
  loggedUser: Equipe;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  token: string;
  urls: Urls;
}

interface Urls {
  distintivos: string;
  fotos: string;
}

interface AuthState {
  token: string;
  user: User;
  loggedUser: Equipe;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);
  const [urls, setUrls] = useState<Urls>({} as Urls);

  const getUrls = useCallback(async () => {
    const response = await DomainService.getUrLs();
    setUrls(response);
  }, []);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user, loggedUser] = await AsyncStorage.multiGet([
        '@futLiga:token',
        '@futLiga:user',
        '@futLiga:loggedUser',
      ]);

      if (token[1] && user[1] && loggedUser[1]) {
        setData({
          token: token[1],
          user: JSON.parse(user[1]),
          loggedUser: JSON.parse(loggedUser[1]),
        });
      }

      getUrls();

      setLoading(false);
    }

    loadStorageData();
  }, [getUrls, urls.fotos, urls.distintivos]);

  const signIn = useCallback(async ({email, password}) => {
    const {token} = await TokenService.request({login: {email, password}});
    const decodedToken: any = jwt_decode(token);
    const payloadObject = JSON.parse(decodedToken.payload.replace(/'/g, '"'));

    const {
      Apelido,
      Email,
      EquipesQueAdministra,
      Foto,
      Id,
      IsAdmin,
      NomeCompleto,
      Tipo,
    } = payloadObject;

    const equipesArray: Array<any> = EquipesQueAdministra;

    const equipes: Equipe[] = equipesArray.map(equipe => {
      return {
        distintivo: equipe.Distintivo,
        id: equipe.Id,
        nomeApresentacao: equipe.NomeApresentacao,
        nomeCompleto: equipe.NomeCompleto,
        nomeConta: equipe.NomeConta,
        situacaoCadastral: equipe.SituacaoCadastral,
      };
    });

    const loggedUser = equipes[0];

    const user: User = {
      apelido: Apelido,
      email: Email,
      equipesQueAdministra: equipes,
      foto: Foto,
      id: Id,
      isAdmin: IsAdmin,
      nomeCompleto: NomeCompleto,
      tipo: Tipo,
    };

    await AsyncStorage.multiSet([
      ['@futLiga:token', token],
      ['@futLiga:user', JSON.stringify(user)],
      ['@futLiga:loggedUser', JSON.stringify(loggedUser)],
    ]);

    Authorization(token);
    setData({token, user, loggedUser});
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@futLiga:token', '@futLiga:user']);

    setData({} as AuthState);
    setUrls({} as Urls);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        loggedUser: data.loggedUser,
        signIn,
        signOut,
        loading,
        token: data.token,
        urls,
      }}>
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
