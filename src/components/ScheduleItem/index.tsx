import React, {useCallback, useMemo} from 'react';

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

const ScheduleItem: React.FC<ScheduleItemProps> = ({data}) => {
  let scheduleInfo: ScheduleInfo = data;
  const {urls} = useAuth();
  const avatar = useMemo(() => {
    if (!scheduleInfo.equipe.distintivo)
      scheduleInfo.equipe.distintivo = '0-4.gif';
    return `${urls.distintivos}${scheduleInfo.equipe.distintivo}`;
  }, [scheduleInfo, urls]);

  const importantInformationHandle = useCallback(async () => {
    Alert.alert('DEMO: Informação importante');
  }, []);

  const detailedInformationHandle = useCallback(async () => {
    Alert.alert('DEMO: Informação Detalhado');
  }, []);

  const evaluationHandle = useCallback(async () => {
    Alert.alert('DEMO: Avaliação');
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

  return (
    <Container>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
        }}>
        <AdjustableImage
          style={{flex: 1, width: 150, height: 100}}
          size="100%"
          isUri={true}
          image={avatar}
        />
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
              <TouchableOpacity>
                <Text style={{fontSize: 15}}>
                  {scheduleInfo.equipe.nomeApresentacao}
                </Text>
                <Text style={{fontSize: 11}}>??</Text>
                <Text style={{fontSize: 11}}>
                  {scheduleInfo.equipe.bairro}/{scheduleInfo.equipe.cidade}
                </Text>
              </TouchableOpacity>
              <View>
                <TouchableOpacity
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
            <TouchableOpacity>
              <Image source={imgSend} style={{width: 16, height: 16}}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default ScheduleItem;
