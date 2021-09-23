import React, {useCallback} from 'react';
import {Modalize} from 'react-native-modalize';
import {Text, TouchableOpacity, View} from 'react-native';
import {IHandles} from 'react-native-modalize/lib/options';
import {getBottomSpace} from 'react-native-iphone-x-helper';

import fonts from '../../styles/fonts';
import colors from '../../styles/colors';

interface Props {
  children?: React.ReactNode;
  modalizeRef?: React.RefObject<IHandles>;
  title: string;
}

const ModalInformation: React.FC<Props> = ({modalizeRef, children, title}) => {
  const handleCloseModal = useCallback(() => {
    modalizeRef?.current?.close();
  }, []);
  return (
    <Modalize
      onClosed={() => {}}
      modalStyle={{overflow: 'hidden', height: 10}}
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
              borderStyle: 'solid',
              borderBottomWidth: 5,
              borderBottomColor: 'red',
              backgroundColor: colors.bright_gray,
              width: '100%',
              textTransform: 'uppercase',
            }}>
            {title}
          </Text>
        </View>
      }
      ref={modalizeRef}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 12,
          paddingVertical: 12,
        }}>
        <View>{children}</View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-end',
          alignContent: 'flex-start',
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
            Fechar
          </Text>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
};

export default ModalInformation;
