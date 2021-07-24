/* eslint-disable react-native/no-inline-styles */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {ScrollView} from 'react-native-gesture-handler';
import {RegularBar} from '../../components/RegularBar';
import localePtBr from '../../utils/calendar/locales/localePtBr';
import ScheduleItem from '../../components/ScheduleItem';
import {Container, RootView} from './styles';
import {Text, TouchableOpacity, View} from 'react-native';
import {Row} from '../../components/Row';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {Modalize} from 'react-native-modalize';

import api from '../../services/api';
import {useAuth} from '../../hooks/auth';
import {ParamRoute} from '../../models/ParamRoute';

const ScheduleGame: React.FC<ParamRoute> = paramRoute => {
  localePtBr();
  const {loggedUser} = useAuth();
  const [scheduleList, setScheduleList] = useState([]);
  const {scheduleGameDate, scheduleType, scheduleTypeDest} =
    paramRoute.route.params;
  const modalizeRef = useRef<Modalize>(null);
  const handleClosedModal = useCallback(() => {}, []);
  const handleCloseModal = useCallback(() => {
    modalizeRef.current?.close();
  }, []);
  const handleOpenModal = () => {
    modalizeRef.current?.open();
  };

  //Construir a mecanica de carregar mais usando FlatList
  const getScheduleList = useCallback(async () => {
    const response = await api.get(
      '/Calendario/' +
        scheduleType +
        '/Exibir' +
        scheduleTypeDest +
        '/' +
        loggedUser.id +
        '/' +
        scheduleGameDate.dateString +
        '/false/1',
    );
    setScheduleList(response.data.resultados);
  }, [scheduleGameDate, scheduleType]);

  useEffect(() => {
    getScheduleList();
  }, []);

  return (
    <RootView>
      <RegularBar title="AGENDAR JOGO" />
      <Container>
        <ScrollView>
          {/* <FlatList
            data={scheduleList}
            keyExtractor={item=>String(item.mandanteId)}
            renderItem={({item})=>(
                <ScheduleItem data={item}/>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}>
          </FlatList> */}
          {scheduleList.map(scheduleItem => (
            <ScheduleItem data={scheduleItem}></ScheduleItem>
          ))}
        </ScrollView>
      </Container>
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
              Marcar jogo como
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
              <Text>Ola mundo!</Text>
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
    </RootView>
  );
};

export default ScheduleGame;
