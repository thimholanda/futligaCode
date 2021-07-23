/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {Container} from './styles';

interface Props {
  title: string;
}

export const RegularBar: React.FC<Props> = ({title}) => {
  const navigation = useNavigation();

  return (
    <>
      <Container>
        <View
          style={{
            flex: 1,
            height: 70,
            marginTop: 0,
            marginBottom: 0,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => navigation.goBack()}>
              <Image
                style={{width: '100%', height: 21}}
                source={require('../../../src/assets/voltar.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 4,
              height: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                color: 'white',
                fontFamily: 'Oswald-Light',
                fontSize: 24,
                textAlign: 'center',
              }}>
              {title}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => console.log('aew')}
              style={{
                flexDirection: 'row',
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{width: '100%', height: 26}}
                source={require('../../../src/assets/sino.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    </>
  );
};
