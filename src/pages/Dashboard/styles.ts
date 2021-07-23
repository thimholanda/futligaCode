import {Pagination} from 'react-native-snap-carousel';
import styled from 'styled-components/native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const ContainerCarousel = styled.View`
  flex: 1;
  padding: 15px 0;
`;

export const StyledPagination = styled(Pagination).attrs({
  containerStyle: {marginTop: 5, paddingVertical: 0},
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
})``;

export const TitleTeam = styled.Text`
  text-align: center;
  font-family: ${fonts.medium};
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 0px;
  color: ${colors.gray};
`;

export const TextRegular = styled.Text`
  text-align: center;
  font-size: 15px;
  font-family: ${fonts.regular};
  margin-top: -2px;
  color: ${colors.gray};
`;

export const Badge = styled.View`
  width: auto;
  align-self: center;
  padding: 2px 8px;
  background-color: ${colors.light_gray};
  margin-bottom: 14px;
  margin-top: 4px;
  border-radius: 8px;
`;

export const BadgeText = styled.Text`
  text-align: center;
  font-size: 15px;
  font-family: ${fonts.regular};
  margin-top: -2px;
  color: ${colors.gray};
`;

export const TextSince = styled.Text`
  font-family: ${fonts.medium};
  color: ${colors.gray};
  text-transform: uppercase;
  text-align: center;
  font-size: 15px;
`;

export const TextDistrict = styled.Text`
  font-family: ${fonts.regular};
  color: ${colors.gray};
  text-align: center;
  font-size: 15px;
  margin-top: -4px;
  margin-bottom: 8px;
`;

export const ContainerAvatar = styled.View`
  flex: 1;
  justify-content: flex-start;
`;

export const ContainerScheduleGame = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const ContainerScheduleGameSingle = styled.View`
  flex-grow: 1;
  flex-basis: 0;
`;

export const ContainerScheduleGameAvatar = styled.View`
  height: 65%;
`;

export const TextScheduleDate = styled.Text`
  margin-bottom: 0px;
  text-align: center;
  font-family: ${fonts.regular};
  color: ${colors.gray};
  font-size: 14px;
  line-height: 16px;
`;

export const TextScheduleDivider = styled.Text`
  font-size: 40px;
  align-self: center;
  color: ${colors.gray};
`;
