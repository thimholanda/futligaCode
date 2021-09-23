import {SafeAreaView} from 'react-navigation';
import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';

export const Container = styled(SafeAreaView)``;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#717e7f',
    flexGrow: 1,
    position: 'relative',
    marginTop: 15,
  },
});
