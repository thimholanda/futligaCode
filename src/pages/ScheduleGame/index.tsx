/* eslint-disable react-native/no-inline-styles */

import React, {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {RegularBar} from '../../components/RegularBar';
import localePtBr from '../../utils/calendar/locales/localePtBr';
import ScheduleItem from '../../components/ScheduleItem';
import {Container, RootView} from './styles';

import {useAuth} from '../../hooks/auth';

import {CalendarioService} from '../../services';
import {CalendarioResponse, ParamRoute, ScheduleInfo} from '../../models';
import {Convert} from '../../utils';
import MainView from '../../components/MainView';
import {ActivityIndicator} from 'react-native';
import colors from '../../styles/colors';
import Loading from '../../components/Loading';
import {TypeGame} from '../../enums';

const ScheduleGame: React.FC<ParamRoute> = paramRoute => {
  localePtBr();
  const {loggedUser} = useAuth();
  const [scheduleList, setScheduleList] = useState<ScheduleInfo[]>([]);
  const {scheduleGameData, scheduleType} = paramRoute.route.params;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [temMaisRegistros, setTemMaisRegistros] = useState(true);

  const handleFetchMore = async (distance: number) => {
    if (distance < 0) return;
    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    await getScheduleList();
    console.log('page', await page);
  };

  async function getScheduleList() {
    console.log('call getScheduleList');
    if (temMaisRegistros === false) {
      console.log('nao tem mais registros');
      return;
    }
    let calendarioResponse: CalendarioResponse = scheduleGameData;
    let response: any[] = [];
    if (scheduleType === TypeGame.VISITANTE) {
      response = await CalendarioService.getVisitantesDisponiveis({
        equipe: parseInt(loggedUser.id),
        rodadaFutLiga: calendarioResponse.configuracoes.rodadaFutLiga,
        data: Convert.stringTodate(calendarioResponse.calendario.data),
        pagina: page,
      });
    } else if (scheduleType === TypeGame.MANDANTE) {
      response = await CalendarioService.getMandantesDisponiveis({
        equipe: parseInt(loggedUser.id),
        rodadaFutLiga: calendarioResponse.configuracoes.rodadaFutLiga,
        data: Convert.stringTodate(calendarioResponse.calendario.data),
        pagina: page,
      });
    }

    setTemMaisRegistros(response.temMaisRegistros);

    if (!response.resultados) {
      return setLoading(true);
    }

    if (page > 1) {
      setScheduleList(oldValue => [...oldValue, ...response.resultados]);
    } else {
      setScheduleList(response.resultados);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  useEffect(() => {
    getScheduleList();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <MainView>
        <RegularBar title="AGENDAR JOGO" />
        <Container>
          <FlatList
            data={scheduleList}
            keyExtractor={item =>
              String(item.desafianteId) +
              String(item.mandanteId) +
              String(item.visitanteId)
            }
            renderItem={({item}) => <ScheduleItem data={item} />}
            showsVerticalScrollIndicator={true}
            numColumns={1}
            onEndReachedThreshold={0.1}
            onEndReached={({distanceFromEnd}) =>
              temMaisRegistros ? handleFetchMore(distanceFromEnd) : null
            }
            ListFooterComponent={
              loadingMore ? (
                <ActivityIndicator
                  style={{marginVertical: 10}}
                  color={colors.green}
                />
              ) : (
                <></>
              )
            }></FlatList>
        </Container>
      </MainView>
    </>
  );
};

export default ScheduleGame;
