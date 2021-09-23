import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {Container} from './styles';

import imgTime from '../../assets/icons8-time-24.png';
import imgHourglass from '../../assets/icons8-hourglass-24.png';
import imgRoad from '../../assets/icons8-road-30.png';
import imgRisk from '../../assets/icons8-high-risk-16.png';
import imgMarker from '../../assets/icons8-marker-24.png';
import imgTrophy from '../../assets/icons8-trophy-48.png';
import imgSend from '../../assets/icons8-email-send-24.png';
import imgStar from '../../assets/icons8-star-48.png';
import {Image, Text, View, TouchableOpacity, Alert} from 'react-native';
import {useAuth} from '../../hooks/auth';
import {AdjustableImage} from '../AdjustableImage';
import {ScheduleInfo, ScheduleItemProps} from '../../models';
import {useNavigation} from '@react-navigation/native';
import {Convert} from '../../utils';
import {TypeGame} from '../../enums';
import {LocaisMandoService} from '../../services';

interface Props {
  data: object;
  openInformation(value: object): void;
  scheduleType: TypeGame;
}

const ScheduleItem: React.FC<Props> = ({
  data,
  openInformation,
  scheduleType,
}) => {
  const {urls} = useAuth();
  const navigation = useNavigation();
  const [locaisMando, setLocaisMando] = useState({});
  let scheduleInfo: ScheduleInfo = data;

  const locaisMandoByCodeFetch = useCallback(async (codigo: number) => {
    if (!codigo) return null;
    let response = await LocaisMandoService.get({codigo});
    setLocaisMando(response);
  }, []);

  const avatar = useMemo(() => {
    if (!scheduleInfo.equipe.distintivo)
      scheduleInfo.equipe.distintivo = '0-4.gif';
    return `${urls.distintivos}${scheduleInfo.equipe.distintivo}`;
  }, [scheduleInfo, urls]);

  const importantInformationHandle = useCallback(async () => {
    openInformation({
      type: 1,
      title: 'Informação importante',
      data: [
        'Alerta de Feriado\n\nFeriado prolongado de 04/09/2021 a 07/09/2021 - Independência do Brasil\nComo você está tentando marcar jogo para uma data de feriado, certifique-se de você terá número de jogadores suficientes para o jogo. Não deixe para cancelar o jogo na última hora. Além de evitar multas para sua equipe, você contribui para que a equipe adversária procure adversários disponíveis para esta data. Caso seja de seu interesse, bloqueie a data ou a semana em que sua equipe não está disponível.',
        'Restrição de acesso\n\nAtenção, a equipe Interage está com acesso restrito à resposta de convites.\nSe você prosseguir, existe uma grande possibilidade deste convite não ser respondido a tempo, ou mesmo ser cancelado por inatividade de 7 dias.',
      ],
    });
  }, []);

  const detailedInformationHandle = useCallback(async () => {
    openInformation({
      type: 2,
      title: locaisMandoInfo.nomeCompleto,
      data: {scheduleInfo, locaisMandoInfo},
    });
  }, [scheduleInfo, locaisMandoInfo]);

  const evaluationHandle = useCallback(async () => {
    openInformation({
      type: 4,
      title: 'Avaliação',
      data: {
        interage: 4,
        pontualidade: 3,
        cordialidade: 4,
        elenco: 5,
        uniforme: 5,
        disciplina: 4,
        competividade: 4,
        tecnica: 2,
        torcida: 3,
        arbitragem: 4,
      },
    });
  }, []);

  //todo: verificar erro na conversao
  const dateSchedule = new Date(scheduleInfo.data);

  //verificar de trabalhar com recurso formatacao
  function checkZero(data: string) {
    if (data.length == 1) {
      data = '0' + data;
    }
    return data;
  }
  const timeSchedule =
    checkZero(dateSchedule.getHours().toString()) +
    ':' +
    checkZero(dateSchedule.getMinutes().toString());

  const handleSelected = () => {
    navigation.navigate('ScheduleGameInfo', {
      params: {
        information: scheduleInfo,
        locaisMandoInfo: locaisMandoInfo,
      },
    });
  };

  const handleTimeSchedule = useCallback(async () => {
    openInformation({
      type: 3,
      title: 'Mensagem FutLiga',
      data: 'Partida se inicia às ' + timeSchedule,
    });
  }, []);

  const handleLastAccess = useCallback(async () => {
    console.log(Convert.stringTodate(new Date(), 'dd/MM/yyyy'));
    // openInformation({
    //   type: 3,
    //   title: 'Mensagem FutLiga',
    //   data:
    //     'Último acesso em ' ,
    // });
  }, []);

  const handleDistance = useCallback(async () => {
    openInformation({
      type: 3,
      title: 'Mensagem FutLiga',
      data:
        'O local do adversário está a ' +
        scheduleInfo.painel.distancia +
        ' km de distância',
    });
  }, []);

  const handleInvite = useCallback(async () => {
    navigation.navigate('InviteGame', {
      params: {
        scheduleInfo,
      },
    });
  }, []);

  useEffect(() => {
    locaisMandoByCodeFetch(scheduleInfo.equipe.mandante?.localMandoId);
  }, []);

  const locaisMandoInfo = useMemo(() => {
    return locaisMando;
  }, [locaisMando]);

  return (
    <Container style={{backgroundColor: 'white'}}>
      <TouchableOpacity
        onPress={handleSelected}
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
        }}>
        <TouchableOpacity
          style={{flex: 1, width: 150, height: 100}}
          onPress={handleSelected}>
          <AdjustableImage size="100%" isUri={true} image={avatar} />
        </TouchableOpacity>
        <View
          style={{
            flex: 2,
          }}>
          <View style={{paddingTop: 5}}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                alignContent: 'flex-start',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={handleSelected}>
                <Text style={{fontSize: 15, maxWidth: 150}}>
                  {scheduleInfo.equipe.nomeApresentacao}
                </Text>
                <Text style={{fontSize: 11}}>
                  {locaisMandoInfo.nomeCompleto}
                </Text>
                <Text style={{fontSize: 11, maxWidth: 150}}>
                  {locaisMandoInfo.bairro}/{locaisMandoInfo.cidade}
                </Text>
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  onPress={handleTimeSchedule}
                  style={{
                    marginBottom: 5,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    alignContent: 'flex-start',
                  }}>
                  <Image
                    source={imgTime}
                    style={{marginRight: 5, width: 16, height: 16}}></Image>
                  <Text style={{fontSize: 11}}>{timeSchedule}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleLastAccess}
                  style={{
                    marginBottom: 5,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    alignContent: 'flex-start',
                  }}>
                  <Image
                    source={imgHourglass}
                    style={{marginRight: 5, width: 16, height: 16}}></Image>
                  <Text style={{fontSize: 11}}>
                    {scheduleInfo.painel.diasUltimoAcesso}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDistance}
                  style={{
                    marginBottom: 5,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    alignContent: 'flex-start',
                  }}>
                  <Image
                    source={imgRoad}
                    style={{marginRight: 5, width: 16, height: 16}}></Image>
                  <Text style={{fontSize: 11}}>
                    {scheduleInfo.painel.distancia}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              alignContent: 'flex-start',
              justifyContent: 'space-around',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <TouchableOpacity onPress={importantInformationHandle}>
              <Image
                source={imgRisk}
                style={{width: 16, height: 16, marginRight: 5}}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={detailedInformationHandle}>
              <Image
                source={imgMarker}
                style={{width: 16, height: 16, marginRight: 5}}></Image>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={evaluationHandle}
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={imgStar}
                style={{width: 16, height: 16, marginRight: 1}}></Image>
              <Image
                source={imgStar}
                style={{width: 16, height: 16, marginRight: 1}}></Image>
              <Image
                source={imgStar}
                style={{width: 16, height: 16, marginRight: 1}}></Image>
              <Image
                source={imgStar}
                style={{width: 16, height: 16, marginRight: 1}}></Image>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                alignContent: 'flex-start',
                marginRight: 5,
              }}>
              <Image
                source={imgTrophy}
                style={{width: 16, height: 16, marginRight: 5}}></Image>
              <Text style={{fontSize: 11}}>
                {scheduleInfo.painel.rankingAtualAdversario}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleInvite}>
              <Image source={imgSend} style={{width: 16, height: 16}}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Container>
  );
};

export default ScheduleItem;
