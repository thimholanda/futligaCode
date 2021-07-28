import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Carousel from 'react-native-snap-carousel';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {Text, TouchableOpacity, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useNavigation} from '@react-navigation/native';

import {useAuth} from '../../hooks/auth';

import MainContainer from '../../components/MainContainer';
import RegularBackground from '../../components/RegularBackground';
import {AdjustableImage} from '../../components/AdjustableImage';
import {Row} from '../../components/Row';
import MainView from '../../components/MainView';
import {RegularBar} from '../../components/RegularBar';
import RegularScroll from '../../components/RegularScroll';
import {ButtonFeaturedBox} from '../../components/ButtonFeaturedBox';
import {FeaturedBox} from '../../components/FeaturedBox';

import {
  Badge,
  BadgeText,
  ContainerAvatar,
  ContainerCarousel,
  ContainerScheduleGame,
  ContainerScheduleGameAvatar,
  ContainerScheduleGameSingle,
  StyledPagination,
  TextDistrict,
  TextScheduleDate,
  TextScheduleDivider,
  TextSince,
  TitleTeam,
} from './styles';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import iconSchedule from '../../assets/icon-schedule-game.png';
import IconHome from '../../assets/icon-home.svg';
import IconRoad from '../../assets/icon-road.svg';

import {EquipesService} from '../../services';

import {IScheduleData, ITeamInfo} from '../../models';
import {TypeGame} from '../../enums';

const Dashboard: React.FC = () => {
  const navigation = useNavigation();
  const {loggedUser, urls} = useAuth();
  const carouselRef = useRef<Carousel<IScheduleData>>(
    {} as Carousel<IScheduleData>,
  );
  const modalizeRef = useRef<Modalize>(null);
  const [schedule, setSchedule] = useState<IScheduleData[]>([]);
  const [carouselWidth, setCarouselWidth] = useState(100);
  const [activeSlide, setActiveSlide] = useState(0);
  const [teamInfo, setTeamInfo] = useState<ITeamInfo>({} as ITeamInfo);
  const [scheduleType, setScheduleType] = useState<TypeGame>(TypeGame.EMPTY);

  const userName = useMemo(() => {
    return loggedUser.nomeApresentacao.toUpperCase();
  }, [loggedUser]);

  const avatar = useMemo(() => {
    return (
      loggedUser.distintivo && `${urls.distintivos}${loggedUser.distintivo}`
    );
  }, [loggedUser, urls]);

  const handleScheduleGame = useCallback(() => {
    setScheduleType(TypeGame.EMPTY);
    modalizeRef.current?.open();
  }, []);

  const handleCloseModal = useCallback(() => {
    modalizeRef.current?.close();
  }, []);

  const handleClosedModal = useCallback(() => {
    if (scheduleType !== TypeGame.EMPTY) {
      navigation.navigate('CalendarGame', {
        scheduleType: scheduleType,
      });
    }
  }, [navigation, scheduleType]);

  const handleScheduleGameType = useCallback((type: TypeGame) => {
    setScheduleType(type);
  }, []);

  const getEquipesListar2 = useCallback(async () => {
    return await EquipesService.getAgenda({
      equipe: parseInt(loggedUser.id),
    });
  }, [loggedUser]);

  const getTeamInfo = useCallback(async () => {
    const response = await EquipesService.get({
      codigo: parseInt(loggedUser.id),
    });
    setTeamInfo(response);
  }, [loggedUser]);

  useEffect(() => {
    getTeamInfo();
    getEquipesListar2().then(response => {
      let agendas = response.agenda as Array<any>;
      setSchedule(
        agendas.map((item: IScheduleData) => {
          item.ano = item.dataJogo.slice(0, 4);
          item.mes = item.dataJogo.slice(4, 6);
          item.dia = item.dataJogo.slice(6, 8);
          return item;
        }),
      );
    });

    if (scheduleType !== '') {
      modalizeRef.current?.close();
    }
  }, [scheduleType]);

  const since = useMemo(() => {
    if (teamInfo.fundacao) {
      const sinceFormated = teamInfo.fundacao.substring(0, 4);
      sinceFormated.slice(0, 1);
      return `${sinceFormated}`;
    }
  }, [teamInfo]);

  return (
    <>
      <MainView>
        <RegularBar title={userName} logout={true} />
        <MainContainer>
          <RegularBackground />
          <RegularScroll>
            <Row>
              <ButtonFeaturedBox
                aspectRatio={0.8}
                isHalf
                marginTo="right"
                title="MEU TIME"
                onPress={() => {}}>
                <ContainerAvatar>
                  <AdjustableImage size="72%" isUri={true} image={avatar} />
                  <View>
                    <TextSince>Desde {since}</TextSince>
                    <TextDistrict>
                      {teamInfo.bairro} | {teamInfo.uf}
                    </TextDistrict>
                  </View>
                </ContainerAvatar>
              </ButtonFeaturedBox>
              <ButtonFeaturedBox
                aspectRatio={0.8}
                isHalf
                marginTo="left"
                title="MARCAR JOGO"
                onPress={handleScheduleGame}>
                <AdjustableImage size="80%" image={iconSchedule} />
              </ButtonFeaturedBox>
            </Row>
            <Row marginType="middle">
              <FeaturedBox aspectRatio={1.35} title="PRÓXIMOS JOGOS">
                <ContainerCarousel
                  onLayout={event => {
                    setCarouselWidth(event.nativeEvent.layout.width);
                  }}>
                  <Carousel
                    layout={'default'}
                    data={schedule}
                    sliderWidth={carouselWidth}
                    keyExtractor={(_, index) => String(index)}
                    renderItem={({item}: {item: IScheduleData}) => (
                      <>
                        <ContainerScheduleGame>
                          <ContainerScheduleGameSingle>
                            <TouchableOpacity>
                              <TitleTeam>
                                {item.mandante.nomeApresentacao.toUpperCase()}
                              </TitleTeam>
                              <Badge>
                                <BadgeText>Mandante</BadgeText>
                              </Badge>
                              <ContainerScheduleGameAvatar>
                                <AdjustableImage
                                  size="80%"
                                  isUri
                                  image={
                                    item.mandante.distintivo &&
                                    `${urls.distintivos}${item.mandante.distintivo}`
                                  }
                                />
                              </ContainerScheduleGameAvatar>
                            </TouchableOpacity>
                          </ContainerScheduleGameSingle>

                          <View>
                            <TextScheduleDate>
                              {`${item.dia}/${item.mes}/${item.ano}`}
                              {'\n'}
                              {item.horaInicio}
                            </TextScheduleDate>
                            <TextScheduleDivider>X</TextScheduleDivider>
                          </View>

                          <ContainerScheduleGameSingle>
                            <TouchableOpacity>
                              <TitleTeam>
                                {item.visitante.nomeApresentacao.toUpperCase()}
                              </TitleTeam>
                              <Badge>
                                <BadgeText>Visitante</BadgeText>
                              </Badge>
                              <ContainerScheduleGameAvatar>
                                <AdjustableImage
                                  isUri
                                  size="80%"
                                  image={
                                    item.visitante.distintivo &&
                                    `${urls.distintivos}${item.visitante.distintivo}`
                                  }
                                />
                              </ContainerScheduleGameAvatar>
                            </TouchableOpacity>
                          </ContainerScheduleGameSingle>
                        </ContainerScheduleGame>
                      </>
                    )}
                    itemWidth={carouselWidth}
                    ref={carouselRef}
                    onSnapToItem={index => setActiveSlide(index)}
                  />
                  <StyledPagination
                    dotsLength={schedule.length}
                    activeDotIndex={activeSlide}
                    carouselRef={carouselRef.current}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                  />
                </ContainerCarousel>
              </FeaturedBox>
            </Row>
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
                // backgroundColor: colors.bright_gray,
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
              <TouchableOpacity
                onPress={() => handleScheduleGameType(TypeGame.MANDANTE)}
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: colors.bright_gray,
                  borderRadius: 30,
                  marginBottom: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <IconHome width={35} height={35} />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  color: colors.gray,
                  textAlign: 'center',
                  fontSize: 14,
                }}>
                {TypeGame.MANDANTE}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => handleScheduleGameType(TypeGame.VISITANTE)}
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: colors.bright_gray,
                  borderRadius: 30,
                  marginBottom: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <IconRoad width={35} height={35} />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  color: colors.gray,
                  textAlign: 'center',
                  fontSize: 14,
                }}>
                {TypeGame.VISITANTE}
              </Text>
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

export default Dashboard;
