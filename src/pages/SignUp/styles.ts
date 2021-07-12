import styled from 'styled-components/native';
import {Platform} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const ImageBackground = styled.ImageBackground`
    flex: 1;
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 20% 30px ${Platform.OS === 'android' ? 100 : 40}px 30px;
`;

export const Container = styled.View`
    flex: 1;
`;

export const BacktoSignInContainer = styled.View`
    position: absolute;
    bottom: ${20 + getBottomSpace()}px;
    justify-content: center;
    align-items: center;
    width: 100%;

`;

export const Title = styled.Text`
    font-size: 24px;
    line-height: 28px;
    color: #f4ede8;
    font-family: 'Oswald-Regular';
    margin: 30px 0 30px 0;
    text-align: center;
    padding: 0 20px;
`;

export const BacktoSignIn =  styled.TouchableOpacity`
    
    background: rgba(0,0,0, .6);
    padding: 10px 16px;
    border: 1px solid white;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

export const BacktoSignInText = styled.Text`
    font-family: 'Oswald-Regular';
    font-size: 16px;
    line-height: 20px;
    color: white;
    margin-left: 8px
`;
