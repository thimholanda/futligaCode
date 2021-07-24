/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {Calendar, DateObject} from 'react-native-calendars';
import {View, Image, Text} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import api from '../../services/api';

import {CalendarioService} from '../../services/index';

import {ScrollView} from 'react-native-gesture-handler';

import imgBg from '../../assets/bg-signin.png';
import mask from '../../assets/masks/calendar-mask.png';
import {RegularBar} from '../../components/RegularBar';
import localePtBr from '../../utils/calendar/locales/localePtBr';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../hooks/auth';

import {RootView} from './styles';

interface RouteProps {
  key: string;
  name: string;
  params: any;
}

interface ParamRoute {
  route: RouteProps;
}

const CalendarGame: React.FC<ParamRoute> = paramRoute => {
  localePtBr();
  const navigation = useNavigation();
  const {loggedUser} = useAuth();
  const {scheduleType, scheduleTypeDest} = paramRoute.route.params;
  const [scheduleListCalendar, setScheduleListCalendar] = useState([]);
  const handleChosenDay = useCallback(
    (dateObject: DateObject) => {
      navigation.navigate('ScheduleGame', {
        scheduleGameDate: dateObject,
        scheduleType: scheduleType,
        scheduleTypeDest: scheduleTypeDest,
      });
    },
    [navigation],
  );

  const getScheduleCalendarList = useCallback(async () => {
    console.log('starting...[getScheduleCalendarList]');

    const teste = await CalendarioService.exibir({
      equipe: parseInt(loggedUser.id),
    }); // Mandante
    const teste1 = await CalendarioService.exibir1({
      equipe: parseInt(loggedUser.id),
    }); // Visitante

    console.log('teste', teste);
    console.log('teste1', teste1);

    const teste2 = await api.get(
      '/Calendario/' + scheduleType + '/Exibir/' + loggedUser.id,
    );
    console.log('teste2', teste1);

    //   const response = useCallback(async () => {
    //     await api.get('/Calendario/' + scheduleType + '/Exibir/' + loggedUser.id);
    //     setScheduleListCalendar(response.data);
  }, [scheduleType]);

  useEffect(() => {
    getScheduleCalendarList();
  }, []);

  const marketDates = () => {
    let dates = [];
    scheduleListCalendar.map(date => {
      let data = new Date(date.calendario.data);
      let dataFinal: string =
        checkZero(data.getFullYear().toString()) +
        '-' +
        checkZero(data.getMonth().toString()) +
        '-' +
        checkZero(data.getDay().toString());
    });
    dates.push({
      '2021-07-25': {
        selected: true,
        marked: true,
        dotColor: '#d9534f',
        selectedColor: '#f0ad4e',
      },
    });
    console.log(dates);
    return dates;
  };

  function checkZero(data: string) {
    if (data.length == 1) {
      data = '0' + data;
    }
    return data;
  }

  return (
    <RootView>
      <RegularBar title="MARCAR JOGO" />

      <View style={{backgroundColor: 'white'}}>
        <Calendar
          onDayPress={handleChosenDay}
          theme={{
            arrowColor: '#666',
          }}
          firstDay={1}
          markedDates={marketDates()}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: 20,
            }}>
            <View
              style={{
                width: 12,
                height: 12,
                backgroundColor: '#5bc0de',
                marginRight: 5,
                borderRadius: 50,
              }}
            />
            <Text
              style={{
                fontFamily: 'Oswald-Regular',
                color: '#666',
                fontSize: 12,
                lineHeight: 16,
              }}>
              DATA FUTLIGA
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: 20,
            }}>
            <View
              style={{
                width: 12,
                height: 12,
                backgroundColor: '#f0ad4e',
                marginRight: 5,
                borderRadius: 50,
              }}
            />
            <Text
              style={{
                fontFamily: 'Oswald-Regular',
                color: '#666',
                fontSize: 12,
                lineHeight: 16,
              }}>
              FERIADO
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: 20,
            }}>
            <View
              style={{
                width: 12,
                height: 12,
                backgroundColor: '#d9534f',
                marginRight: 5,
                borderRadius: 50,
              }}
            />
            <Text
              style={{
                fontFamily: 'Oswald-Regular',
                color: '#666',
                fontSize: 12,
                lineHeight: 16,
              }}>
              FECHADO
            </Text>
          </View>
        </View>
      </View>
      <View style={{flex: 1, overflow: 'hidden'}}>
        <Image
          source={imgBg}
          resizeMode="cover"
          style={{position: 'absolute', width: '100%', left: 0, bottom: 0}}
        />
        <Image
          source={mask}
          resizeMode="cover"
          style={{
            position: 'absolute',
            left: 0,
            top: -1,
            width: '100%',
            height: 300,
          }}
        />
        <ScrollView style={{paddingHorizontal: 20}} />
      </View>
    </RootView>
  );
};

export default CalendarGame;
