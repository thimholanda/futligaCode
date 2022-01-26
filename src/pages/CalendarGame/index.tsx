/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Calendar, DateObject} from 'react-native-calendars';
import {View, Text, TouchableOpacity, Alert} from 'react-native';

import {CalendarioService} from '../../services/index';

import {useNavigation} from '@react-navigation/native';

import {RegularBar} from '../../components/RegularBar';
import localePtBr from '../../utils/calendar/locales/localePtBr';
import {useAuth} from '../../hooks/auth';

import {environment} from '../../environment';

import {
  Calendario,
  CalendarioResponse,
  CalendarMarkedDay,
  ParamRoute,
} from '../../models';
import {TypeGame} from '../../enums';
import {Convert} from '../../utils';
import {Modalize} from 'react-native-modalize';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import {Row} from '../../components/Row';
import MainView from '../../components/MainView';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import MainContainer from '../../components/MainContainer';
import RegularBackground from '../../components/RegularBackground';
import RegularScroll from '../../components/RegularScroll';

const CalendarGame: React.FC<ParamRoute> = paramRoute => {
  localePtBr();
  const navigation = useNavigation();
  const {loggedUser} = useAuth();
  const {scheduleType} = paramRoute.route.params;
  const [calendarDates, setCalendarDates] = useState([]);
  const [calendarChosenDayData, setCalendarChosenDayData] =
    useState<CalendarioResponse>({} as CalendarioResponse);

  const modalizeRef = useRef<Modalize>(null);
  const handleClosedModal = useCallback(() => {}, []);
  const handleCloseModal = useCallback(() => {
    modalizeRef.current?.close();
  }, []);
  const handleOpenModal = (dateObject: DateObject) => {
    let calendarDate = calendarDates[dateObject.dateString];
    if (calendarDate) {
      if (calendarDate.data.configuracoes.mensagemRodadaFutLiga) {
        Alert.alert(
          'Mensagem FutLiga',
          calendarDate.data.configuracoes.mensagemRodadaFutLiga,
        );
      } else {
        setCalendarChosenDayData(calendarDate.data);
        modalizeRef.current?.open();
      }
    }
  };

  const handleChosenDay = () => {
    handleCloseModal();
    navigation.navigate('ScheduleGame', {
      params: {
        calendarGameData: calendarChosenDayData,
        scheduleType: scheduleType,
      },
    });
  };

  const title = useMemo(() => {
    if (calendarChosenDayData.calendario) {
      return Convert.stringTodate(
        calendarChosenDayData.calendario.data,
        'dd/MM/yyyy',
      );
    }
    return `Não escolhido!`;
  }, [calendarChosenDayData]);

  const getScheduleCalendarList = useCallback(async () => {
    let calendario: Calendario[] = [];
    if (scheduleType === TypeGame.VISITANT) {
      calendario = await CalendarioService.getCalendarioVisitante({
        equipe: parseInt(loggedUser.id),
      });
    } else if (scheduleType === TypeGame.CLIENT) {
      calendario = await CalendarioService.getCalendarioMandante({
        equipe: parseInt(loggedUser.id),
      });
    }
    return calendario;
  }, [scheduleType]);

  const marketDates = useCallback(async calendarLists => {
    let dates: any = {};
    calendarLists.map((response: CalendarioResponse) => {
      let dataFinal: string = Convert.stringTodate(response.calendario.data);
      let dateSelected: CalendarMarkedDay = {
        disabled: true,
        disableTouchEvent: true,
        marked: true,
        selectedColor: '#fff',
        dotColor: '#fff',
      };

      //FutLiga
      if (response.configuracoes.rodadaFutLiga === true) {
        dateSelected.selected = true;
        dateSelected.selectedColor = '#5bc0de';
        dateSelected.dotColor = '#5bc0de';
        dateSelected.disabled = false;
        dateSelected.disableTouchEvent = false;
        dateSelected.marked = true;
      }

      //Dia Normal
      if (
        response.calendario.visitantesDisponiveis > 0 &&
        response.configuracoes.rodada !== null &&
        response.configuracoes.rodadaFutLiga === false
      ) {
        dateSelected.disabled = false;
        dateSelected.disableTouchEvent = false;
        dateSelected.dotColor = '#5bc0de';
      }

      //Fechado
      if (response.configuracoes.rodada === null) {
        dateSelected.selected = true;
        dateSelected.selectedColor = '#d9534f';
        dateSelected.dotColor = '#d9534f';
        //eliminar
        dateSelected.disabled = false;
        dateSelected.disableTouchEvent = false;
      }

      //Feriado
      if (response.configuracoes.feriado === true) {
        dateSelected.selected = true;
        dateSelected.selectedColor = '#f0ad4e';
        dateSelected.dotColor = '#f0ad4e';
      }

      dateSelected.data = response;

      dates[dataFinal] = dateSelected;
    });
    return dates;
  }, []);

  useEffect(() => {
    console.log('inciando');
    getScheduleCalendarList().then((listDates: any) => {
      console.log('listDates', listDates);
      marketDates(listDates).then(dates => {
        setCalendarDates(dates);
      });
    });
  }, []);

  return (
    <>
      <MainView>
        <RegularBar title="MARCAR JOGO" />
        <MainContainer>
          <RegularBackground />
          <RegularScroll>
            <Calendar
              onDayPress={handleOpenModal}
              theme={{
                arrowColor: '#666',
              }}
              firstDay={1}
              markedDates={calendarDates}
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
          </RegularScroll>
        </MainContainer>
      </MainView>
      <Modalize
        onClosed={handleClosedModal}
        modalStyle={{overflow: 'hidden'}}
        withHandle={false}
        adjustToContentHeight={true}
        HeaderComponent={
          <View>
            <Text
              style={{
                fontFamily: fonts.regular,
                color: colors.dark_gray,
                textAlign: 'center',
                fontSize: 16,
                paddingTop: 14,
              }}>
              Deseja prosseguir ?
            </Text>
          </View>
        }
        ref={modalizeRef}>
        <View style={{flex: 1, paddingHorizontal: 12, paddingVertical: 12}}>
          <Row
            style={{
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingVertical: 20,
            }}>
            <View>
              <Text onPress={handleChosenDay}>{title}</Text>
            </View>
          </Row>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: colors.bright_gray,
            paddingVertical: 14,
            paddingBottom: getBottomSpace() + 16,
            borderStyle: 'solid',
            borderTopWidth: 1,
            borderTopColor: colors.border_gray,
          }}>
          <TouchableOpacity onPress={handleCloseModal}>
            <Text
              style={{
                fontFamily: fonts.regular,
                fontSize: 16,
                color: colors.dark_gray,
                textAlign: 'center',
              }}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </>
  );
};

export default CalendarGame;
