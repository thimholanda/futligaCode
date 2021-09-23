/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAuth} from '../../hooks/auth';

import {Container} from './styles';

interface Props {
  title: string;
  logout?: boolean;
  rightAction?: void;
  changeTimeAction?: void;
  showChangeTime?: boolean;
}

export const RegularBar: React.FC<Props> = ({
  title,
  logout,
  rightAction,
  changeTimeAction,
  showChangeTime,
}) => {
  const navigation = useNavigation();
  const {signOut} = useAuth();
  const onActionGoBack = () => {
    if (logout) {
      signOut();
    } else {
      navigation.goBack();
    }
  };
  const onActionRight = () => {
    if (rightAction) rightAction();
  };

  const onActionChangeTime = () => {
    if (changeTimeAction) changeTimeAction();
  };

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
              onPress={onActionGoBack}>
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
            <TouchableOpacity onPress={onActionChangeTime}>
              <Image
                style={{
                  width: 45,
                  height: 45,
                  display: showChangeTime ? 'flex' : 'none',
                }}
                source={require('../../../src/assets/icons8-troca-de-jogador-100.png')}
                resizeMode="center"
              />
            </TouchableOpacity>
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
              onPress={onActionRight}
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
