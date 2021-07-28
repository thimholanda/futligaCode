/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

import { IRequestOptions, IRequestConfig, getConfigs, axios } from './serviceOptions';
export const basePath = '';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
export interface JsonResult<T> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

export class CalendarioService {
  /**
   *
   */
  static getCalendarioMandante(
    params: {
      /**  */
      equipe: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Calendario/Mandante/Exibir/{equipe}';
      url = url.replace('{equipe}', params['equipe'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getVisitantesDisponiveis(
    params: {
      /**  */
      equipe: number;
      /**  */
      data: string;
      /**  */
      rodadaFutLiga: boolean;
      /**  */
      pagina: number;
      /**  */
      distanciaInicial?: number;
      /**  */
      distanciaFinal?: number;
      /**  */
      somenteAgendaLivre?: boolean;
      /**  */
      mandantes?: boolean;
      /**  */
      visitantes?: boolean;
      /**  */
      uf?: string;
      /**  */
      cidade?: string;
      /**  */
      regiao?: number;
      /**  */
      bairro?: string;
      /**  */
      categoriaId?: number;
      /**  */
      nome?: string;
      /**  */
      equipeId?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Calendario/Mandante/ExibirVisitantes/{equipe}/{data}/{rodadaFutLiga}/{pagina}';
      url = url.replace('{equipe}', params['equipe'] + '');
      url = url.replace('{data}', params['data'] + '');
      url = url.replace('{rodadaFutLiga}', params['rodadaFutLiga'] + '');
      url = url.replace('{pagina}', params['pagina'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        distanciaInicial: params['distanciaInicial'],
        distanciaFinal: params['distanciaFinal'],
        somenteAgendaLivre: params['somenteAgendaLivre'],
        mandantes: params['mandantes'],
        visitantes: params['visitantes'],
        uf: params['uf'],
        cidade: params['cidade'],
        regiao: params['regiao'],
        bairro: params['bairro'],
        categoriaId: params['categoriaId'],
        nome: params['nome'],
        equipeId: params['equipeId']
      };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getVisitantesDisponiveisAgrupados(
    params: {
      /**  */
      equipe: number;
      /**  */
      data: string;
      /**  */
      agrupadoPor: string;
      /**  */
      distanciaInicial?: number;
      /**  */
      distanciaFinal?: number;
      /**  */
      somenteAgendaLivre?: boolean;
      /**  */
      mandantes?: boolean;
      /**  */
      visitantes?: boolean;
      /**  */
      uf?: string;
      /**  */
      cidade?: string;
      /**  */
      regiaoId?: number;
      /**  */
      bairro?: string;
      /**  */
      categoriaId?: number;
      /**  */
      localMandoId?: number;
      /**  */
      horario?: string;
      /**  */
      nome?: string;
      /**  */
      equipeId?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Calendario/Mandante/ExibirVisitantesAgrupados/{equipe}/{data}/{agrupadoPor}';
      url = url.replace('{equipe}', params['equipe'] + '');
      url = url.replace('{data}', params['data'] + '');
      url = url.replace('{agrupadoPor}', params['agrupadoPor'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        distanciaInicial: params['distanciaInicial'],
        distanciaFinal: params['distanciaFinal'],
        somenteAgendaLivre: params['somenteAgendaLivre'],
        mandantes: params['mandantes'],
        visitantes: params['visitantes'],
        uf: params['uf'],
        cidade: params['cidade'],
        regiaoId: params['regiaoId'],
        bairro: params['bairro'],
        categoriaId: params['categoriaId'],
        localMandoId: params['localMandoId'],
        horario: params['horario'],
        nome: params['nome'],
        equipeId: params['equipeId']
      };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getCalendarioVisitante(
    params: {
      /**  */
      equipe: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Calendario/Visitante/Exibir/{equipe}';
      url = url.replace('{equipe}', params['equipe'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getMandantesDisponiveis(
    params: {
      /**  */
      equipe: number;
      /**  */
      data: string;
      /**  */
      rodadaFutLiga: boolean;
      /**  */
      pagina: number;
      /**  */
      distanciaInicial?: number;
      /**  */
      distanciaFinal?: number;
      /**  */
      uf?: string;
      /**  */
      cidade?: string;
      /**  */
      regiao?: number;
      /**  */
      bairro?: string;
      /**  */
      categoriaId?: number;
      /**  */
      localMandoId?: number;
      /**  */
      horario?: string;
      /**  */
      nome?: string;
      /**  */
      equipeId?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Calendario/Visitante/ExibirMandantes/{equipe}/{data}/{rodadaFutLiga}/{pagina}';
      url = url.replace('{equipe}', params['equipe'] + '');
      url = url.replace('{data}', params['data'] + '');
      url = url.replace('{rodadaFutLiga}', params['rodadaFutLiga'] + '');
      url = url.replace('{pagina}', params['pagina'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        distanciaInicial: params['distanciaInicial'],
        distanciaFinal: params['distanciaFinal'],
        uf: params['uf'],
        cidade: params['cidade'],
        regiao: params['regiao'],
        bairro: params['bairro'],
        categoriaId: params['categoriaId'],
        localMandoId: params['localMandoId'],
        horario: params['horario'],
        nome: params['nome'],
        equipeId: params['equipeId']
      };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getMandantesDisponiveisAgrupados(
    params: {
      /**  */
      equipe: number;
      /**  */
      data: string;
      /**  */
      agrupadoPor: string;
      /**  */
      distanciaInicial?: number;
      /**  */
      distanciaFinal?: number;
      /**  */
      uf?: string;
      /**  */
      cidade?: string;
      /**  */
      regiaoId?: number;
      /**  */
      bairro?: string;
      /**  */
      categoriaId?: number;
      /**  */
      localMandoId?: number;
      /**  */
      horario?: string;
      /**  */
      nome?: string;
      /**  */
      equipeId?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Calendario/Visitante/ExibirMandantesAgrupados/{equipe}/{data}/{agrupadoPor}';
      url = url.replace('{equipe}', params['equipe'] + '');
      url = url.replace('{data}', params['data'] + '');
      url = url.replace('{agrupadoPor}', params['agrupadoPor'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        distanciaInicial: params['distanciaInicial'],
        distanciaFinal: params['distanciaFinal'],
        uf: params['uf'],
        cidade: params['cidade'],
        regiaoId: params['regiaoId'],
        bairro: params['bairro'],
        categoriaId: params['categoriaId'],
        localMandoId: params['localMandoId'],
        horario: params['horario'],
        nome: params['nome'],
        equipeId: params['equipeId']
      };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class DomainService {
  /**
   *
   */
  static getUrLs(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Domain/GetURLs';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class EquipesService {
  /**
   *
   */
  static get(
    params: {
      /**  */
      codigo: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Equipes/{codigo}';
      url = url.replace('{codigo}', params['codigo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getAll(
    params: {
      /**  */
      pagina: number;
      /**  */
      unidade?: number;
      /**  */
      genero?: string;
      /**  */
      modalidade?: string;
      /**  */
      faixaEtaria?: string;
      /**  */
      tipoMandanteVisitante?: string;
      /**  */
      nome?: string;
      /**  */
      latitude?: number;
      /**  */
      longitude?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Equipes/Listar/{pagina}';
      url = url.replace('{pagina}', params['pagina'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        unidade: params['unidade'],
        genero: params['genero'],
        modalidade: params['modalidade'],
        faixaEtaria: params['faixaEtaria'],
        tipoMandanteVisitante: params['tipoMandanteVisitante'],
        nome: params['nome'],
        latitude: params['latitude'],
        longitude: params['longitude']
      };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getSeguidores(
    params: {
      /**  */
      pagina: number;
      /**  */
      equipe: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Equipes/{equipe}/Seguidores/Listar/{pagina}';
      url = url.replace('{pagina}', params['pagina'] + '');
      url = url.replace('{equipe}', params['equipe'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getAgenda(
    params: {
      /**  */
      equipe: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Equipes/{equipe}/Agenda/Listar';
      url = url.replace('{equipe}', params['equipe'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getResultados(
    params: {
      /**  */
      equipe: number;
      /**  */
      pagina: number;
      /**  */
      ano?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Equipes/{equipe}/Resultados/Listar/{pagina}';
      url = url.replace('{equipe}', params['equipe'] + '');
      url = url.replace('{pagina}', params['pagina'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { ano: params['ano'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getRanking(
    params: {
      /**  */
      equipe: number;
      /**  */
      ano?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Equipes/{equipe}/Ranking/ExibirTemporada';
      url = url.replace('{equipe}', params['equipe'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { ano: params['ano'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getRankingsDisputados(
    params: {
      /**  */
      equipe: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Equipes/{equipe}/Ranking/ExibirTemporadasDisputadas';
      url = url.replace('{equipe}', params['equipe'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getRankingDetalhado(
    params: {
      /**  */
      equipe: number;
      /**  */
      ano: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Equipes/{equipe}/Ranking/ExibirRankingDetalhado/{ano}';
      url = url.replace('{equipe}', params['equipe'] + '');
      url = url.replace('{ano}', params['ano'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class FaixasEtariasService {
  /**
   *
   */
  static getAll(options: IRequestOptions = {}): Promise<FaixaEtaria[]> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/FaixasEtarias/Listar';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class GenerosService {
  /**
   *
   */
  static getAll(options: IRequestOptions = {}): Promise<Genero[]> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Generos/Listar';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static get(
    params: {
      /**  */
      codigo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Genero> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Generos/{codigo}';
      url = url.replace('{codigo}', params['codigo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class JogosService {
  /**
   *
   */
  static getFlyerJogoAgendadoLiga(
    params: {
      /**  */
      dataJogo: string;
      /**  */
      sequencia: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Jogos/ObterFlyerJogoAgendadoLiga/{dataJogo}/{sequencia}';
      url = url.replace('{dataJogo}', params['dataJogo'] + '');
      url = url.replace('{sequencia}', params['sequencia'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getFlyerResultadoLiga(
    params: {
      /**  */
      dataJogo: string;
      /**  */
      sequencia: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Jogos/ObterFlyerResultadoLiga/{dataJogo}/{sequencia}';
      url = url.replace('{dataJogo}', params['dataJogo'] + '');
      url = url.replace('{sequencia}', params['sequencia'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class LocaisMandoService {
  /**
   *
   */
  static get(
    params: {
      /**  */
      codigo: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/LocaisMando/{codigo}';
      url = url.replace('{codigo}', params['codigo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getLocaisMando(
    params: {
      /**  */
      pagina: number;
      /**  */
      unidade?: number;
      /**  */
      modalidade?: string;
      /**  */
      nome?: string;
      /**  */
      latitude?: number;
      /**  */
      longitude?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/LocaisMando/Listar/{pagina}';
      url = url.replace('{pagina}', params['pagina'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        unidade: params['unidade'],
        modalidade: params['modalidade'],
        nome: params['nome'],
        latitude: params['latitude'],
        longitude: params['longitude']
      };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class ModalidadesService {
  /**
   *
   */
  static getAll(options: IRequestOptions = {}): Promise<Modalidade[]> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Modalidades';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class RankingsService {
  /**
   *
   */
  static getMandante(
    params: {
      /**  */
      ranking: number;
      /**  */
      ano: number;
      /**  */
      pagina: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Rankings/Listar/{ranking}/{ano}/Mandante/{pagina}';
      url = url.replace('{ranking}', params['ranking'] + '');
      url = url.replace('{ano}', params['ano'] + '');
      url = url.replace('{pagina}', params['pagina'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getVisitante(
    params: {
      /**  */
      ranking: number;
      /**  */
      ano: number;
      /**  */
      pagina: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Rankings/Listar/{ranking}/{ano}/Visitante/{pagina}';
      url = url.replace('{ranking}', params['ranking'] + '');
      url = url.replace('{ano}', params['ano'] + '');
      url = url.replace('{pagina}', params['pagina'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getRankingPorProximidade(
    params: {
      /**  */
      quantidadeDeSugestoes: number;
      /**  */
      latitude: number;
      /**  */
      longitude: number;
      /**  */
      modalidade?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Rankings/ListarPorProximidade/{quantidadeDeSugestoes}/{latitude}/{longitude}';
      url = url.replace('{quantidadeDeSugestoes}', params['quantidadeDeSugestoes'] + '');
      url = url.replace('{latitude}', params['latitude'] + '');
      url = url.replace('{longitude}', params['longitude'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { modalidade: params['modalidade'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class RodadasFutLigaService {
  /**
   *
   */
  static getTemporadas(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/RodadasFutLiga/Temporadas';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getUnidades(
    params: {
      /**  */
      ano: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/RodadasFutLiga/Unidades/{ano}';
      url = url.replace('{ano}', params['ano'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getRankings(
    params: {
      /**  */
      ano: number;
      /**  */
      unidade: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/RodadasFutLiga/Rankings/{ano}/{unidade}';
      url = url.replace('{ano}', params['ano'] + '');
      url = url.replace('{unidade}', params['unidade'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getRodadas(
    params: {
      /**  */
      ano: number;
      /**  */
      ranking: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/RodadasFutLiga/Rodadas/{ano}/{ranking}';
      url = url.replace('{ano}', params['ano'] + '');
      url = url.replace('{ranking}', params['ranking'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getParticipantee(
    params: {
      /**  */
      ano: number;
      /**  */
      ranking: number;
      /**  */
      semana: number;
      /**  */
      tipoEquipe?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/RodadasFutLiga/Participantes/{ano}/{ranking}/{semana}';
      url = url.replace('{ano}', params['ano'] + '');
      url = url.replace('{ranking}', params['ranking'] + '');
      url = url.replace('{semana}', params['semana'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { tipoEquipe: params['tipoEquipe'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static jogos(
    params: {
      /**  */
      ano: number;
      /**  */
      ranking: number;
      /**  */
      semana: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/RodadasFutLiga/Jogos/{ano}/{ranking}/{semana}';
      url = url.replace('{ano}', params['ano'] + '');
      url = url.replace('{ranking}', params['ranking'] + '');
      url = url.replace('{semana}', params['semana'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class TokenService {
  /**
   *
   */
  static requestToken(
    params: {
      /**  */
      login?: LoginRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Token/Request';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['login'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class UsuariosService {
  /**
   *
   */
  static get(
    params: {
      /**  */
      codigo: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Usuarios/{codigo}';
      url = url.replace('{codigo}', params['codigo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getEquipesSeguindo(
    params: {
      /**  */
      usuario: number;
      /**  */
      pagina: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/Usuarios/{usuario}/EquipesSeguindo/Listar/{pagina}';
      url = url.replace('{usuario}', params['usuario'] + '');
      url = url.replace('{pagina}', params['pagina'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export interface FaixaEtaria {
  /**  */
  id?: string;

  /**  */
  descricao?: string;

  /**  */
  equipes?: Equipe[];

  /**  */
  rankings?: FaixaEtariaRanking[];
}

export interface Equipe {
  /**  */
  id?: number;

  /**  */
  situacaoCadastral?: string;

  /**  */
  nomeCompleto?: string;

  /**  */
  nomeApresentacao?: string;

  /**  */
  sigla?: string;

  /**  */
  nomeConta?: string;

  /**  */
  fundacao?: string;

  /**  */
  cores?: string;

  /**  */
  generoId?: string;

  /**  */
  faixaEtariaId?: string;

  /**  */
  modalidadeId?: string;

  /**  */
  quadros?: string;

  /**  */
  mandante?: string;

  /**  */
  visitante?: string;

  /**  */
  tipoEquipe?: string;

  /**  */
  responsavelId?: number;

  /**  */
  bairro?: string;

  /**  */
  regiao?: string;

  /**  */
  cidade?: string;

  /**  */
  uf?: string;

  /**  */
  cep?: string;

  /**  */
  referencias?: string;

  /**  */
  distintivo?: string;

  /**  */
  latitude?: number;

  /**  */
  longitude?: number;

  /**  */
  faixaEtaria?: FaixaEtaria;

  /**  */
  modalidade?: Modalidade;

  /**  */
  genero?: Genero;

  /**  */
  unidades?: UnidadeEquipe[];

  /**  */
  seguidores?: SeguidorEquipe[];

  /**  */
  agendamentos?: AgendaEquipe[];

  /**  */
  convitesComoMandante?: AgendaLiga[];

  /**  */
  convitesComoVisitante?: AgendaLiga[];

  /**  */
  rankingsAnuais?: RankingAnualLiga[];

  /**  */
  rankingsSemanais?: RankingSemanalLiga[];

  /**  */
  rodadasFutLiga?: EquipeRodadaFutLiga[];

  /**  */
  campeonatosDisputados?: EquipeCampeonato[];
}

export interface FaixaEtariaRanking {
  /**  */
  rankingId?: number;

  /**  */
  faixaEtariaId?: string;

  /**  */
  inicioVigencia?: Date;

  /**  */
  terminoVigencia?: Date;

  /**  */
  ranking?: RankingLiga;

  /**  */
  faixaEtaria?: FaixaEtaria;
}

export interface Modalidade {
  /**  */
  id?: string;

  /**  */
  descricao?: string;

  /**  */
  pathFlyerFoto?: string;

  /**  */
  pathFlyerLink?: string;

  /**  */
  equipes?: Equipe[];

  /**  */
  locais?: LocalMando[];

  /**  */
  rankings?: RankingLiga[];
}

export interface Genero {
  /**  */
  id?: string;

  /**  */
  descricao?: string;

  /**  */
  equipes?: Equipe[];

  /**  */
  rankings?: RankingLiga[];
}

export interface UnidadeEquipe {
  /**  */
  unidadeId?: number;

  /**  */
  equipeId?: number;

  /**  */
  inicioVigencia?: Date;

  /**  */
  finalVigencia?: Date;

  /**  */
  municipioId?: number;

  /**  */
  equipe?: Equipe;
}

export interface SeguidorEquipe {
  /**  */
  equipeId?: number;

  /**  */
  usuarioId?: number;

  /**  */
  receberNotificacoes?: boolean;

  /**  */
  dataInclusao?: Date;

  /**  */
  equipe?: Equipe;

  /**  */
  usuario?: Usuario;
}

export interface AgendaEquipe {
  /**  */
  equipeId?: number;

  /**  */
  tipo?: string;

  /**  */
  dataAgenda?: string;

  /**  */
  semana?: string;

  /**  */
  statusAgenda?: string;

  /**  */
  aceitarConvites?: string;

  /**  */
  diaSemana?: number;

  /**  */
  statusSemana?: string;

  /**  */
  convitesEnviados?: number;

  /**  */
  convitesRecebidos?: number;

  /**  */
  localMandoId?: number;

  /**  */
  horaInicio?: string;

  /**  */
  horaFim?: string;

  /**  */
  localCoberto?: string;

  /**  */
  rodadaFutLiga?: boolean;

  /**  */
  equipe?: Equipe;

  /**  */
  localMando?: LocalMando;
}

export interface AgendaLiga {
  /**  */
  dataJogo?: string;

  /**  */
  sequencia?: number;

  /**  */
  unidadeId?: number;

  /**  */
  localMandoId?: number;

  /**  */
  horaInicio?: string;

  /**  */
  horaFim?: string;

  /**  */
  dataConvite?: string;

  /**  */
  desafianteEquipeId?: number;

  /**  */
  aceito?: string;

  /**  */
  mandanteEquipeId?: number;

  /**  */
  visitanteEquipeId?: number;

  /**  */
  status?: string;

  /**  */
  statusMandante?: string;

  /**  */
  statusVisitante?: string;

  /**  */
  mandanteMotivoId?: number;

  /**  */
  motivoMandante?: string;

  /**  */
  visitanteMotivoId?: number;

  /**  */
  motivoVisitante?: string;

  /**  */
  posicaoMandante?: string;

  /**  */
  posicaoVisitante?: string;

  /**  */
  notificacaoMandante?: string;

  /**  */
  notificacaoVisitante?: string;

  /**  */
  equipePlacarId?: number;

  /**  */
  placarAceito?: string;

  /**  */
  placarData?: string;

  /**  */
  motivoPlacar?: string;

  /**  */
  tentativas?: number;

  /**  */
  semanaJogo?: string;

  /**  */
  rodada?: number;

  /**  */
  tipoPlacarVisitante?: string;

  /**  */
  tipoVisitante?: string;

  /**  */
  placarValido?: string;

  /**  */
  motivoPlacarInvalido?: string;

  /**  */
  distancia?: number;

  /**  */
  eventoId?: number;

  /**  */
  sumulaMandante?: string;

  /**  */
  sumulaVisitante?: string;

  /**  */
  motivoPontuacaoId?: number;

  /**  */
  motivoPontuacaoMandanteId?: number;

  /**  */
  motivoPontuacaoVisitanteId?: number;

  /**  */
  envioLembreteUsuarios?: boolean;

  /**  */
  rodadaFutLiga?: boolean;

  /**  */
  mandante?: Equipe;

  /**  */
  visitante?: Equipe;

  /**  */
  local?: LocalMando;

  /**  */
  semana?: SemanaLiga;

  /**  */
  placares?: ResultadoLiga[];

  /**  */
  jogoCampeonato?: JogoCampeonatoLiga;
}

export interface RankingAnualLiga {
  /**  */
  ano?: number;

  /**  */
  rankingId?: number;

  /**  */
  tipo?: string;

  /**  */
  equipeId?: number;

  /**  */
  pontosValidos?: number;

  /**  */
  aproveitamento?: number;

  /**  */
  pontosGanhos?: number;

  /**  */
  jogos?: number;

  /**  */
  vitorias?: number;

  /**  */
  empates?: number;

  /**  */
  derrotas?: number;

  /**  */
  golsPro?: number;

  /**  */
  golsContra?: number;

  /**  */
  saldo?: number;

  /**  */
  vitoriasWO?: number;

  /**  */
  derrotasWO?: number;

  /**  */
  equipe?: Equipe;

  /**  */
  ranking?: RankingLiga;
}

export interface RankingSemanalLiga {
  /**  */
  ano?: number;

  /**  */
  semana?: number;

  /**  */
  rankingId?: number;

  /**  */
  rodada?: number;

  /**  */
  tipo?: string;

  /**  */
  quadro?: number;

  /**  */
  equipeId?: number;

  /**  */
  pontosValidos?: number;

  /**  */
  pontosGanhos?: number;

  /**  */
  jogos?: number;

  /**  */
  vitorias?: number;

  /**  */
  empates?: number;

  /**  */
  derrotas?: number;

  /**  */
  golsPro?: number;

  /**  */
  golsContra?: number;

  /**  */
  saldo?: number;

  /**  */
  vitoriasWO?: number;

  /**  */
  derrotasWO?: number;

  /**  */
  ultimosResultados?: string;

  /**  */
  equipe?: Equipe;

  /**  */
  ranking?: RankingLiga;
}

export interface EquipeRodadaFutLiga {
  /**  */
  rankingId?: number;

  /**  */
  semana?: string;

  /**  */
  equipeId?: number;

  /**  */
  tipo?: string;

  /**  */
  posicao?: number;

  /**  */
  pontosValidos?: number;

  /**  */
  aproveitamento?: number;

  /**  */
  pontosGanhos?: number;

  /**  */
  jogos?: number;

  /**  */
  vitorias?: number;

  /**  */
  empates?: number;

  /**  */
  derrotas?: number;

  /**  */
  golsPro?: number;

  /**  */
  golsContra?: number;

  /**  */
  saldo?: number;

  /**  */
  vitoriasWO?: number;

  /**  */
  derrotasWO?: number;

  /**  */
  jogoAgendado?: boolean;

  /**  */
  rodadaFutLiga?: RodadaFutLiga;

  /**  */
  equipe?: Equipe;
}

export interface EquipeCampeonato {
  /**  */
  campeonatoId?: number;

  /**  */
  tipo?: string;

  /**  */
  equipeId?: number;

  /**  */
  nome?: string;

  /**  */
  desclassificado?: string;

  /**  */
  grupo?: string;

  /**  */
  permissaoEspecialInscricao?: string;

  /**  */
  distintivo?: string;

  /**  */
  resultado?: string;

  /**  */
  faseResultado?: string;

  /**  */
  faseAlcancada?: number;

  /**  */
  classificacaoFinal?: number;

  /**  */
  cabecaDeChave?: string;

  /**  */
  campeonato?: Campeonato;

  /**  */
  fase?: FaseCampeonato;

  /**  */
  equipe?: Equipe;
}

export interface RankingLiga {
  /**  */
  id?: number;

  /**  */
  descricaoComercial?: string;

  /**  */
  descricaoTecnica?: string;

  /**  */
  unidadeId?: number;

  /**  */
  generoId?: string;

  /**  */
  modalidadeId?: string;

  /**  */
  quadros?: string;

  /**  */
  limitarAdversariosLideres?: boolean;

  /**  */
  unidade?: Unidade;

  /**  */
  modalidade?: Modalidade;

  /**  */
  genero?: Genero;

  /**  */
  rankingsAnuais?: RankingAnualLiga[];

  /**  */
  rankingsSemanais?: RankingSemanalLiga[];

  /**  */
  classificacoes?: ClassificacaoRanking[];

  /**  */
  faixasEtarias?: FaixaEtariaRanking[];

  /**  */
  temporadas?: TemporadaRanking[];

  /**  */
  rodadasFutLiga?: RodadaFutLiga[];
}

export interface LocalMando {
  /**  */
  id?: number;

  /**  */
  nomeCompleto?: string;

  /**  */
  nomeApresentacao?: string;

  /**  */
  modalidadeId?: string;

  /**  */
  endereco?: string;

  /**  */
  numero?: string;

  /**  */
  bairro?: string;

  /**  */
  regiao?: string;

  /**  */
  cidade?: string;

  /**  */
  uf?: string;

  /**  */
  cep?: string;

  /**  */
  latitude?: number;

  /**  */
  longitude?: number;

  /**  */
  modalidade?: Modalidade;

  /**  */
  unidades?: UnidadeLocalMando[];

  /**  */
  agendamentos?: AgendaEquipe[];

  /**  */
  convites?: AgendaLiga[];
}

export interface Usuario {
  /**  */
  id?: number;

  /**  */
  tipo?: string;

  /**  */
  nomeCompleto?: string;

  /**  */
  apelido?: string;

  /**  */
  email?: string;

  /**  */
  senha?: string;

  /**  */
  foto?: string;

  /**  */
  emails?: EmailUsuario[];

  /**  */
  telefones?: TelefoneUsuario[];

  /**  */
  equipesSeguindo?: SeguidorEquipe[];
}

export interface SemanaLiga {
  /**  */
  semana?: string;

  /**  */
  inicio?: Date;

  /**  */
  termino?: Date;

  /**  */
  ano?: number;

  /**  */
  periodo?: string;

  /**  */
  numeroSemana?: number;

  /**  */
  rodada?: number;

  /**  */
  rodadaEspecial?: boolean;

  /**  */
  rodadaFutLiga?: boolean;

  /**  */
  convites?: AgendaLiga[];
}

export interface ResultadoLiga {
  /**  */
  dataJogo?: string;

  /**  */
  sequencia?: number;

  /**  */
  quadro?: number;

  /**  */
  placarMandante?: string;

  /**  */
  placarVisitante?: string;

  /**  */
  aceito?: string;

  /**  */
  motivo?: string;

  /**  */
  ranking?: string;

  /**  */
  rankingMandante?: string;

  /**  */
  rankingVisitante?: string;

  /**  */
  pontosMandante?: number;

  /**  */
  pontosVisitante?: number;

  /**  */
  pontosRankingMandante?: number;

  /**  */
  pontosRankingVisitante?: number;

  /**  */
  sumulaMandante?: string;

  /**  */
  sumulaVisitante?: string;

  /**  */
  perdoarMultaWO?: boolean;

  /**  */
  jogoAgendado?: AgendaLiga;
}

export interface JogoCampeonatoLiga {
  /**  */
  campeonatoId?: number;

  /**  */
  fase?: number;

  /**  */
  rodada?: number;

  /**  */
  dataJogo?: string;

  /**  */
  sequencia?: number;

  /**  */
  jogoNumero?: number;

  /**  */
  jogoFinalizado?: string;

  /**  */
  faseCampeonato?: FaseCampeonato;

  /**  */
  agendaLiga?: AgendaLiga;
}

export interface RodadaFutLiga {
  /**  */
  rankingId?: number;

  /**  */
  semana?: string;

  /**  */
  inicioAgendamento?: Date;

  /**  */
  numeroEquipes?: number;

  /**  */
  ranking?: RankingLiga;

  /**  */
  equipes?: EquipeRodadaFutLiga[];
}

export interface Campeonato {
  /**  */
  id?: number;

  /**  */
  descricao?: string;

  /**  */
  ano?: number;

  /**  */
  urlTrofeu?: string;

  /**  */
  urlSelo?: string;

  /**  */
  urlRegulamento?: string;

  /**  */
  urlFlyerFoto?: string;

  /**  */
  urlFlyerLink?: string;

  /**  */
  fontColorFlyer?: string;

  /**  */
  fases?: FaseCampeonato[];

  /**  */
  equipes?: EquipeCampeonato[];
}

export interface FaseCampeonato {
  /**  */
  campeonatoId?: number;

  /**  */
  fase?: number;

  /**  */
  descricao?: string;

  /**  */
  tipo?: string;

  /**  */
  agendaFutLiga?: string;

  /**  */
  temSumula?: string;

  /**  */
  tipoPontuacao?: string;

  /**  */
  tempoPorPeriodo?: number;

  /**  */
  campeonato?: Campeonato;

  /**  */
  jogosLiga?: JogoCampeonatoLiga[];

  /**  */
  equipesQueAlcancaram?: EquipeCampeonato[];
}

export interface Unidade {
  /**  */
  id?: number;

  /**  */
  nome?: string;

  /**  */
  sigla?: string;

  /**  */
  latitude?: number;

  /**  */
  longitude?: number;

  /**  */
  municipioPrincipalId?: number;

  /**  */
  rankings?: RankingLiga[];
}

export interface ClassificacaoRanking {
  /**  */
  rankingId?: number;

  /**  */
  tipo?: string;

  /**  */
  descricao?: string;

  /**  */
  ranking?: RankingLiga;
}

export interface TemporadaRanking {
  /**  */
  rankingId?: number;

  /**  */
  ano?: number;

  /**  */
  semanaInicioLimitacaoAdversarios?: string;

  /**  */
  numeroEquipesElegiveis?: number;

  /**  */
  prazoRecorrenciaJogos?: number;

  /**  */
  ranking?: RankingLiga;
}

export interface UnidadeLocalMando {
  /**  */
  unidadeId?: number;

  /**  */
  localMandoId?: number;

  /**  */
  inicioVigencia?: Date;

  /**  */
  finalVigencia?: Date;

  /**  */
  municipioId?: number;

  /**  */
  localMando?: LocalMando;
}

export interface EmailUsuario {
  /**  */
  usuarioId?: number;

  /**  */
  email?: string;

  /**  */
  tipo?: string;

  /**  */
  status?: string;

  /**  */
  codigoValidacao?: string;

  /**  */
  dataEnvio?: Date;

  /**  */
  dataValidacao?: Date;

  /**  */
  tentativas?: number;

  /**  */
  usuario?: Usuario;
}

export interface TelefoneUsuario {
  /**  */
  usuarioId?: number;

  /**  */
  ddd?: number;

  /**  */
  numero?: number;

  /**  */
  codigoValidacao?: string;

  /**  */
  dataEnvio?: Date;

  /**  */
  dataValidacao?: Date;

  /**  */
  tentativas?: number;

  /**  */
  usuario?: Usuario;
}

export interface LoginRequest {
  /**  */
  email?: string;

  /**  */
  password?: string;
}
