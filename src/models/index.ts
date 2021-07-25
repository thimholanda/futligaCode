export interface AuthContextData {
  user: User;
  loggedUser: Equipe;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  token: string;
  urls: Urls;
}

export interface AuthState {
  token: string;
  user: User;
  loggedUser: Equipe;
}

export interface Equipe {
  distintivo: string;
  id: string;
  nomeApresentacao: string;
  nomeCompleto: string;
  nomeConta: string;
  situacaoCadastral: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface Urls {
  distintivos: string;
  fotos: string;
}

export interface RouteProps {
  key: string;
  name: string;
  params: any;
}

export interface ParamRoute {
  route: RouteProps;
}

export interface User {
  apelido: string;
  email: string;
  equipesQueAdministra: Array<Equipe>;
  foto: string;
  id: string;
  isAdmin: boolean;
  nomeCompleto: string;
  tipo: string;
}

export interface Headers {
  usuario: string;
  senha: string;
  Authorization?: string;
}

export interface IScheduleData {
  dataJogo: string;
  ano: String;
  dia: String;
  mes: String;
  horaInicio: string;
  mandante: {
    id: string;
    nomeApresentacao: string;
    distintivo: string;
  };
  visitante: {
    id: string;
    nomeApresentacao: string;
    distintivo: string;
  };
}

export interface ITeamInfo {
  fundacao: string;
  uf: string;
  bairro: string;
}
