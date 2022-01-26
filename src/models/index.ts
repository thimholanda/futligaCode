export interface AuthContextData {
  user: User;
  loggedUser: Equipe;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  changeUser(value: any): void;
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
  dataJogo: String;
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

export interface CalendarMarkedDay extends PropsCustom {
  disableTouchEvent?: boolean;
  dotColor?: string;
  selectedColor?: string;
  disabled?: boolean;
  selected?: boolean;
  marked?: boolean;
}

export interface CalendarioResponse {
  calendario: Calendario;
  configuracoes: Configuracoes;
}

export interface Calendario {
  data: string;
  visitantesDisponiveis: number;
}

export interface Configuracoes {
  feriado: boolean;
  rodada: boolean;
  rodadaFutLiga: boolean;
  mensagemRodadaFutLiga: string;
}

export interface PropsCustom {
  data?: any;
}

export interface MandateInfo {
  localMandoId: number;
}

export interface EquipeInfo {
  nome: number;
  nomeApresentacao: string;
  distintivo: string;
  bairro: string;
  cidade: string;
  mandante: MandateInfo;
}

export interface PainelInfo {
  distancia: number;
  diasUltimoAcesso: number;
  rankingAtualAdversario: number;
  avaliacaoAdversario: number;
}

export interface ScheduleInfo {
  data: string;
  equipe: EquipeInfo;
  painel: PainelInfo;
}

export interface ScheduleResponse {
  resultados: ScheduleInfo[];
  estaComRankingRestrito: boolean;
  estaNaRodadaFutLiga: boolean;
  temMaisRegistros: boolean;
  mensagemErro: string;
}

export interface ScheduleItemProps {
  data: any;
}
