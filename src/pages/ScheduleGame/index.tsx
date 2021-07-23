/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Calendar} from 'react-native-calendars';
import {View, Image, Text} from 'react-native';
import {SafeAreaView} from 'react-navigation';

import {ScrollView} from 'react-native-gesture-handler';

import imgBg from '../../assets/bg-signin.png';
import mask from '../../assets/masks/calendar-mask.png';
import {RegularBar} from '../../components/RegularBar';
import localePtBr from '../../utils/calendar/locales/localePtBr';

const ScheduleGame: React.FC = () => {
  localePtBr();

  return (
    <>
      <SafeAreaView
        style={{backgroundColor: '#717e7f', flexGrow: 1}}
        forceInset={{bottom: 'never'}}>
        <RegularBar title="MARCAR JOGO" />

        <View style={{backgroundColor: 'white'}}>
          <Calendar
            theme={{
              arrowColor: '#666',
            }}
            firstDay={1}
            markedDates={{
              '2021-03-23': {
                selected: true,
                marked: true,
                dotColor: '#d9534f',
                selectedColor: '#f0ad4e',
              },
              '2021-03-25': {
                selected: true,
                marked: false,
                selectedColor: '#d9534f',
                disabled: true,
                disableTouchEvent: true,
              },
              '2021-03-28': {disabled: true, disableTouchEvent: true},
              '2021-03-01': {
                selected: true,
                marked: true,
                selectedColor: '#5bc0de',
                dotColor: '#d9534f',
              },
            }}
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
      </SafeAreaView>
    </>
  );
};

export default ScheduleGame;
