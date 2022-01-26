import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {Container} from './styles';

import imgTime from '../../assets/icons8-time-24.png';
import imgBola from '../../assets/icon-bola-24.png';
import imgInfo from '../../assets/icon-info-24.png';
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
    // navigation.navigate('InviteGame', {
    //   params: {
    //     scheduleInfo,
    //   },
    // });

    openInformation({
      type: 6,
      title: 'AGENDAMENTO',
      data: {scheduleInfo},
    });
  }, [scheduleInfo]);

  useEffect(() => {
    locaisMandoByCodeFetch(scheduleInfo.equipe.mandante?.localMandoId);
  }, []);

  const locaisMandoInfo = useMemo(() => {
    return locaisMando;
  }, [locaisMando]);

  return (
    <Container
      style={{
        backgroundColor: 'white',
      }}>
      <TouchableOpacity
        onPress={handleInvite}
        style={{
          paddingHorizontal: 20,
          borderBottomColor: '#ccc',
          flexDirection: 'row',
          borderBottomWidth: 1,
          padding: 10,
        }}>
        <View
          style={{
            width: 100,
            height: 100,
          }}>
          <AdjustableImage size="100%" isUri={true} image={avatar} />
        </View>
        <View
          style={{
            width: 150,
            height: 50,
          }}>
          <Text
            style={{
              color: '#555B5B',
              fontSize: 13,
              textTransform: 'uppercase',
              fontFamily: 'Oswald-Bold',
            }}>
            {scheduleInfo.equipe.nome}
          </Text>
          <Text
            style={{
              color: '#7A7A79',
              fontSize: 13,
              textTransform: 'uppercase',
              fontFamily: 'Oswald-Regular',
            }}>
            {scheduleInfo.equipe.nomeApresentacao}
          </Text>
          <Text
            style={{
              marginTop: 20,
              fontSize: 10,
              color: '#859091',
              textTransform: 'uppercase',
              fontFamily: 'Oswald-Light',
            }}>
            {scheduleInfo.equipe.bairro}/{scheduleInfo.equipe.cidade}
          </Text>
        </View>
        <View style={{}}>
          <Image
            source={imgBola}
            style={{marginRight: 5, width: 50, height: 50}}></Image>
          <Image source={imgInfo} style={{width: 59, height: 28}}></Image>
        </View>
      </TouchableOpacity>
    </Container>
  );
};

export default ScheduleItem;
