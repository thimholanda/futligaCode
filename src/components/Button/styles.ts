import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    width: 100%;
    height: 50px;
    background: rgba(1,119,24,.8);
    justify-content: center;
    align-items: center;
    margin-top: 8px;
    
`;
export const ButtonText = styled.Text`
    font-family: 'Oswald-Regular';
    font-size: 18px;
    color: white;
    align-items: center;
    line-height: 24px;

`;