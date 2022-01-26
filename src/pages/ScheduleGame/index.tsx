import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Tab, TabView} from 'react-native-elements';

import {CalendarioService} from '../../services';
import {Convert} from '../../utils';
import DropDownPicker from 'react-native-dropdown-picker';
import {FlatList} from 'react-native-gesture-handler';
import Loading from '../../components/Loading';
import MainContainer from '../../components/MainContainer';
import MainView from '../../components/MainView';
import ModalInformation from '../../components/ModalInformation';
import {Modalize} from 'react-native-modalize';
import RegularBackground from '../../components/RegularBackground';
import {RegularBar} from '../../components/RegularBar';
import ScheduleItem from '../../components/ScheduleItem';
import {IScheduleData, ScheduleResponse} from '../../models';
import {TypeGame} from '../../enums';
import imgStar from '../../assets/icons8-star-48.png';
import {styles} from './styles';
import {useAuth} from '../../hooks/auth';

import imgDistancia from '../../assets/icon-rua-24.png';
import imgCalendario from '../../assets/icon-calendario-24.png';
import imgLupa from '../../assets/icon-lupa-24.png';
import imgFiltro from '../../assets/icon-filtro-24.png';
import imgOrdenar from '../../assets/icon-ordenar-24.png';
import imgGrupoInveciveis from '../../assets/icon-time-inveciveis-24.png';

import imgCalendarioVerde from '../../assets/icon-calendario-verde-24.png';
import imgRelogio from '../../assets/icon-relogio.png';
import imgBussola from '../../assets/icon-bussola.png';
import imgLocalVerde from '../../assets/icon-local.png';
import imgAvaliacao from '../../assets/icon-avaliacao.png';
import imgTrofeu from '../../assets/icon-trofeu.png';

import {FeaturedBox} from '../../components/FeaturedBox';
import {
  Badge,
  BadgeText,
  ContainerCarousel,
  ContainerScheduleGame,
  ContainerScheduleGameAvatar,
  ContainerScheduleGameSingle,
  StyledPagination,
  TextScheduleDate,
  TextScheduleDivider,
  TitleTeam,
} from '../Dashboard/styles';
import Carousel from 'react-native-snap-carousel';
import {Row} from '../../components/Row';
import {AdjustableImage} from '../../components/AdjustableImage';
import imgBola from '../../assets/icon-bola-24.png';

import imgAlerta from '../../assets/icon-alerta.png';
import imgRanking from '../../assets/icon-ranking.png';
import imgLocal from '../../assets/icon-local.png';

const ScheduleGame: React.FC = navigation => {
  const {loggedUser, urls} = useAuth();
  const {params} = navigation.route.params;
  const [loadingRoot, setLoadingRoot] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [scheduleGameData, setScheduleGameData] = useState<ScheduleResponse>();
  const carouselRef = useRef<Carousel<IScheduleData>>(
    {} as Carousel<IScheduleData>,
  );
  const [schedule, setSchedule] = useState<IScheduleData[]>([]);
  const [carouselWidth, setCarouselWidth] = useState(100);
  const [activeSlide, setActiveSlide] = useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(true);
  const [items, setItems] = useState([
    {label: 'Mostrar equipes da Rodada FutLiga', value: true},
    {label: 'Mostrar todas as equipes', value: false},
  ]);

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState('0');
  const [items1, setItems1] = useState([
    {label: '-', value: '0'},
    {label: 'SP', value: 'SP'},
    {label: 'RJ', value: 'RJ'},
  ]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState('0');
  const [items2, setItems2] = useState([
    {label: '-', value: '0'},
    {label: 'Adulto', value: '1'},
    {label: 'Até 19 Anos', value: '2'},
  ]);

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState('0');
  const [items3, setItems3] = useState([
    {label: '-', value: '0'},
    {label: 'Diadema', value: '1'},
    {label: 'Osasco', value: '2'},
    {label: 'São Paulo', value: '3'},
    {label: 'Taboão da Serra', value: '4'},
  ]);

  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState('0');
  const [items4, setItems4] = useState([
    {label: '-', value: '0'},
    {label: 'Centro', value: '1'},
    {label: 'Leste', value: '2'},
    {label: 'Norte', value: '3'},
    {label: 'Oeste', value: '4'},
    {label: 'Sul', value: '5'},
  ]);

  const [open5, setOpen5] = useState(false);
  const [value5, setValue5] = useState('0');
  const [items5, setItems5] = useState([
    {label: '-', value: '0'},
    {label: 'Americanópolis', value: '1'},
    {label: 'Balneário São Francisco', value: '2'},
    {label: 'Bela Vista', value: '3'},
    {label: 'Centro', value: '4'},
    {label: 'Cidade das Flores', value: '5'},
    {label: 'Conceição', value: '6'},
    {label: 'Conjunto Promorar São Luis', value: '7'},
  ]);

  const [filterRodada, setFilterRodada] = useState({
    rodadaFutLiga: params.calendarGameData.configuracoes.rodadaFutLiga,
  });
  const [filter, setFilter] = useState({
    nomeEquipe: '',
    uf: '',
  });

  const [modalInfo, setModalInfo] = useState<object>({});
  const modalInformationRef = useRef<Modalize>(null);
  const [modalInformationIndex, setModalInformationIndex] = useState(0);

  const clientFetch = useCallback(
    async (page: number, filterRodada: any, filter: any) => {
      return await CalendarioService.getVisitantesDisponiveis({
        equipe: parseInt(loggedUser.id),
        rodadaFutLiga: filterRodada.rodadaFutLiga,
        data: Convert.stringTodate(params.calendarGameData.calendario.data),
        pagina: page,
        nome: filter.nomeEquipe,
        uf: filter.uf,
      });
    },
    [],
  );

  const visitantFetch = useCallback(
    async (page: number, filterRodada: any, filter: any) => {
      return await CalendarioService.getMandantesDisponiveis({
        equipe: parseInt(loggedUser.id),
        rodadaFutLiga: filterRodada.rodadaFutLiga,
        data: Convert.stringTodate(params.calendarGameData.calendario.data),
        pagina: page,
        nome: filter.nomeEquipe,
        uf: filter.uf,
      });
    },
    [],
  );

  const scheduleGameFetch = useCallback(
    async (page: number, filterRodada: any, filter: any) => {
      let data = scheduleGameData || ({} as ScheduleResponse);
      switch (params.scheduleType) {
        case TypeGame.CLIENT: {
          data = await clientFetch(page, filterRodada, filter);
          break;
        }
        case TypeGame.VISITANT: {
          data = await visitantFetch(page, filterRodada, filter);
          break;
        }
      }

      if (page > 1) {
        // @ts-ignore
        setScheduleGameData((oldValue: ScheduleResponse) => ({
          ...data,
          resultados: [...oldValue.resultados, ...data.resultados],
        }));
      } else {
        setScheduleGameData(data);
      }
      setLoadingRoot(false);
      setLoadingMore(false);
    },
    [],
  );

  const scheduleGameFetchMore = () => {
    if (
      loadingMore ||
      (scheduleGameData && scheduleGameData.temMaisRegistros == false)
    ) {
      return;
    }
    setLoadingMore(true);
    setPage(page + 1);
  };

  const scheduleGameResultData: ScheduleResponse = useMemo(() => {
    return scheduleGameData ? scheduleGameData : [];
  }, [scheduleGameData]);

  const handleChangeFilterRodada = (value: any) => {
    setLoadingRoot(true);
    setFilterRodada((oldValue: any) => ({
      ...oldValue,
      rodadaFutLiga: value,
    }));
  };

  useEffect(() => {
    setLoadingRoot(true);
    scheduleGameFetch(page, filterRodada, filter);
    const agendas = ['Grupo 1', 'Grupo 2', 'Grupo 3'];
    setSchedule(
      agendas.map((item: IScheduleData) => {
        //item.dataJogo = item;
        return item;
      }),
    );
  }, [page, filterRodada, filter]);

  const onOpenInformation = (value: object) => {
    setModalInfo(value);
    console.log(value);
    modalInformationRef.current?.open();
  };

  const onCloseInformation = () => {
    modalInformationRef.current?.close();
  };

  const tabViewInfo = useMemo(() => {
    let out = {tabs: null, itens: null, evalutions: null};

    if (modalInfo) {
      if (modalInfo.type === 1) {
        let tabs = modalInfo.data.map((value, index) => {
          return (
            <Tab.Item
              type={'solid'}
              buttonStyle={{backgroundColor: '#fff'}}
              titleStyle={{
                height: 30,
                borderBottomColor: 'red',
                color: '#000000',
              }}
              title={++index}
            />
          );
        });
        let itens = modalInfo.data.map((value, index) => {
          return (
            <TabView.Item>
              <Text>{value}</Text>
            </TabView.Item>
          );
        });
        out.tabs = tabs;
        out.itens = itens;
      }
      if (modalInfo && modalInfo.type === 4) {
        out.evalutions = (
          <View style={{flexDirection: 'row'}}>
            <Image
              source={imgStar}
              style={{width: 35, height: 35, marginRight: 1}}></Image>
            <Image
              source={imgStar}
              style={{width: 35, height: 35, marginRight: 1}}></Image>
            <Image
              source={imgStar}
              style={{width: 35, height: 35, marginRight: 1}}></Image>
            <Image
              source={imgStar}
              style={{width: 35, height: 35, marginRight: 1}}></Image>
          </View>
        );
      }
    }
    return out;
  }, [modalInfo]);

  const onChangeNomeEquipe = useCallback(data => {
    setFilter((oldValue: any) => ({
      ...oldValue,
      nomeEquipe: data,
    }));
  }, []);

  const onChangeUf = useCallback(data => {
    setFilter((oldValue: any) => ({
      ...oldValue,
      uf: data,
    }));
  }, []);

  const avatar = useMemo(() => {
    if (
      modalInfo.data &&
      modalInfo.data.scheduleInfo &&
      modalInfo.data.scheduleInfo.equipe
    ) {
      if (!modalInfo?.data && modalInfo.data?.scheduleInfo) {
        modalInfo.data.scheduleInfo.equipe.distintivo = '0-4.gif';
      }
      return `${urls.distintivos}${modalInfo.data.scheduleInfo.equipe.distintivo}`;
    } else return `${urls.distintivos}'0-4.gif'`;
  }, [modalInfo, urls]);

  const onFiltro = useCallback(() => {
    onOpenInformation({
      type: 5,
      title: 'Filtro',
    });
  }, []);

  const importantInformationHandle = useCallback(async () => {
    onOpenInformation({
      type: 1,
      title: 'Informação importante',
      data: [
        'Alerta de Feriado\n\nFeriado prolongado de 04/09/2021 a 07/09/2021 - Independência do Brasil\nComo você está tentando marcar jogo para uma data de feriado, certifique-se de você terá número de jogadores suficientes para o jogo. Não deixe para cancelar o jogo na última hora. Além de evitar multas para sua equipe, você contribui para que a equipe adversária procure adversários disponíveis para esta data. Caso seja de seu interesse, bloqueie a data ou a semana em que sua equipe não está disponível.',
        'Restrição de acesso\n\nAtenção, a equipe Interage está com acesso restrito à resposta de convites.\nSe você prosseguir, existe uma grande possibilidade deste convite não ser respondido a tempo, ou mesmo ser cancelado por inatividade de 7 dias.',
      ],
    });
  }, []);

  return (
    <>
      <MainView>
        <RegularBar title="AGENDAR JOGO" />
        <MainContainer>
          <RegularBackground />
          <View style={styles.rodadaContainer}>
            {scheduleGameResultData.estaNaRodadaFutLiga && (
              <View style={styles.rodadaContent}>
                <Text style={{color: 'white'}}>Rodada Futliga</Text>
                <Text style={{color: 'white'}}>
                  Sua equipe está classificada entre as melhores no Ranking.
                </Text>
                <Text style={{color: 'white'}}>
                  Nesta semana, deverá obrigatoriamente entrentar um adversário
                  que também está posicionado entre os melhores do Ranking.
                </Text>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  onChangeValue={value => {
                    handleChangeFilterRodada(value);
                  }}
                />
              </View>
            )}
          </View>
          {loadingRoot ? (
            <Loading />
          ) : (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 15,
                  }}>
                  <TouchableOpacity>
                    <Image
                      source={imgDistancia}
                      style={{
                        marginLeft: 5,
                        width: 60,
                        height: 45,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={imgCalendario}
                      style={{
                        marginLeft: 15,
                        marginTop: -3,
                        width: 60,
                        height: 50,
                      }}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        top: -30,
                        left: 21,
                      }}>
                      {Convert.stringTodateShort(
                        params.calendarGameData.calendario.data,
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginTop: 15,
                  }}>
                  <TouchableOpacity>
                    <Image
                      source={imgLupa}
                      style={{
                        width: 60,
                        height: 45,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onFiltro}>
                    <Image
                      source={imgFiltro}
                      style={{
                        marginLeft: 15,
                        width: 60,
                        height: 45,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={imgOrdenar}
                      style={{
                        marginLeft: 15,
                        marginRight: 5,
                        width: 60,
                        height: 45,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginLeft: 15,
                  marginRight: 15,
                }}>
                <Row marginType="middle">
                  <FeaturedBox
                    aspectRatio={1.35}
                    title="INVECÍVEIS 2021"
                    isTitleCenter={true}
                    style={{borderRadius: 15}}>
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
                            <TouchableOpacity>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                }}>
                                <Image
                                  source={imgGrupoInveciveis}
                                  width={200}
                                  height={200}
                                />
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  marginTop: 10,
                                }}>
                                <Text>{item}</Text>
                              </View>
                            </TouchableOpacity>
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
              </View>
              <View
                style={{
                  marginLeft: 15,
                  marginRight: 15,
                  padding: 5,
                  borderRadius: 10,
                  backgroundColor: 'white',
                  height: 372,
                }}>
                <FlatList
                  style={styles.listagemJogos}
                  data={scheduleGameResultData.resultados}
                  keyExtractor={(item: object, index: number) => String(index)}
                  renderItem={({item}) => (
                    <ScheduleItem
                      openInformation={onOpenInformation}
                      data={item}
                      scheduleType={params.scheduleType}
                    />
                  )}
                  showsVerticalScrollIndicator={false}
                  onEndReachedThreshold={0.1}
                  onEndReached={scheduleGameFetchMore}
                  ListFooterComponent={
                    loadingMore ? <Loading /> : <></>
                  }></FlatList>
              </View>
            </View>
          )}
        </MainContainer>
      </MainView>

      <ModalInformation
        modalizeRef={modalInformationRef}
        title={modalInfo?.title}>
        {modalInfo?.type == 1 && (
          <View>
            <Tab
              value={modalInformationIndex}
              onChange={setModalInformationIndex}>
              {tabViewInfo.tabs}
            </Tab>
            <TabView
              value={modalInformationIndex}
              onChange={setModalInformationIndex}>
              {tabViewInfo.itens}
            </TabView>
          </View>
        )}
        {modalInfo?.type == 2 && (
          <View>
            <Text>
              Modalidade:{' '}
              {modalInfo?.data?.locaisMandoInfo?.modalidade?.descricao}
            </Text>
            <Text>Piso: N/D</Text>
            <Text>
              Região: {modalInfo?.data?.scheduleInfo?.equipe?.regiaoCidade}
            </Text>
            <Text>Telefone: ???</Text>
            <Text>
              Distancia: {modalInfo?.data?.scheduleInfo?.painel?.distancia} Km
            </Text>
            <Text>
              Endereco:{' '}
              {
                modalInfo?.data?.locaisMandoInfo?.unidade?.codigo?.localMando
                  ?.endereco
              }
              ,
              {
                modalInfo?.data?.locaisMandoInfo?.unidade?.codigo?.localMando
                  ?.numero
              }
              ,{' '}
              {
                modalInfo?.data?.locaisMandoInfo?.unidade?.codigo?.localMando
                  ?.bairro
              }
              ,{' '}
              {
                modalInfo?.data?.locaisMandoInfo?.unidade?.codigo?.localMando
                  ?.cidade
              }{' '}
              /{' '}
              {
                modalInfo?.data?.locaisMandoInfo?.unidade?.codigo?.localMando
                  ?.uf
              }
              ,{' '}
              {
                modalInfo?.data?.locaisMandoInfo?.unidade?.codigo?.localMando
                  ?.cep
              }
            </Text>
            <Text>Referencia: ???</Text>
          </View>
        )}
        {modalInfo?.type == 3 && (
          <View>
            <Text>{modalInfo?.data}</Text>
          </View>
        )}
        {modalInfo?.type == 4 && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              <Text>Pontualidade</Text>
              {tabViewInfo.evalutions}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              <Text>Cordialidade</Text>
              {tabViewInfo.evalutions}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              <Text>Tamanho do Elenco</Text>
              {tabViewInfo.evalutions}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              <Text>Uniforme</Text>
              {tabViewInfo.evalutions}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              <Text>Disciplina</Text>
              {tabViewInfo.evalutions}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              <Text>Competitividade</Text>
              {tabViewInfo.evalutions}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              <Text>Técnica & Tática</Text>
              {tabViewInfo.evalutions}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              <Text>Torcida</Text>
              {tabViewInfo.evalutions}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              <Text>Arbitragem</Text>
              {tabViewInfo.evalutions}
            </View>
          </View>
        )}
        {modalInfo?.type == 5 && (
          <View>
            <Text>Nome da Equipe:</Text>
            <TextInput
              style={{
                height: 40,
                borderWidth: 1,
                marginBottom: 10,
                padding: 10,
                borderRadius: 7,
              }}
              onChangeText={onChangeNomeEquipe}
              value={filter.nomeEquipe}
            />
            <Text>Estado:</Text>
            <View style={{zIndex: 5}}>
              <DropDownPicker
                style={{marginBottom: 10}}
                open={open1}
                value={value1}
                items={items1}
                setOpen={setOpen1}
                setValue={setValue1}
                setItems={setItems1}
                onChangeValue={value => {
                  onChangeUf(value);
                }}
              />
            </View>
            <Text>Categoria:</Text>
            <View style={{zIndex: 4}}>
              <DropDownPicker
                style={{marginBottom: 10}}
                open={open2}
                value={value2}
                items={items2}
                setOpen={setOpen2}
                setValue={setValue2}
                setItems={setItems2}
                onChangeValue={value => {}}
              />
            </View>
            <Text>Cidade:</Text>
            <View style={{zIndex: 3}}>
              <DropDownPicker
                style={{marginBottom: 10}}
                open={open3}
                value={value3}
                items={items3}
                setOpen={setOpen3}
                setValue={setValue3}
                setItems={setItems3}
                onChangeValue={value => {}}
              />
            </View>
            <Text>Região:</Text>
            <View style={{zIndex: 2}}>
              <DropDownPicker
                style={{marginBottom: 10}}
                open={open4}
                value={value4}
                items={items4}
                setOpen={setOpen4}
                setValue={setValue4}
                setItems={setItems4}
                onChangeValue={value => {}}
              />
            </View>
            <Text>Bairro:</Text>
            <View style={{zIndex: 1}}>
              <DropDownPicker
                style={{marginBottom: 10}}
                open={open5}
                value={value5}
                items={items5}
                setOpen={setOpen5}
                setValue={setValue5}
                setItems={setItems5}
                onChangeValue={value => {}}
              />
            </View>
          </View>
        )}
        {modalInfo?.type == 6 && (
          <View>
            <View
              style={{
                paddingHorizontal: 20,
                flexDirection: 'row',
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                padding: 10,
              }}>
              <View
                style={{
                  width: 100,
                  height: 100,
                }}>
                <AdjustableImage size="100%" isUri={true} image={avatar} />
              </View>
              <View
                style={{
                  height: 50,
                }}>
                <View
                  style={{
                    borderRadius: 10,
                    backgroundColor: '#5F6B6C',
                    width: 80,
                    marginBottom: 7,
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 13,
                      fontWeight: '400',
                      fontFamily: 'Oswald-Light',
                      textAlign: 'center',
                    }}>
                    {params.scheduleType === TypeGame.CLIENT && 'MANDANTE'}
                    {params.scheduleType === TypeGame.VISITANT && 'VISITANTE'}
                  </Text>
                </View>
                <Text
                  style={{
                    color: '#555B5B',
                    fontSize: 13,
                    textTransform: 'uppercase',
                    fontWeight: '800',
                    fontFamily: 'Oswald-Bold',
                  }}>
                  {modalInfo?.data?.scheduleInfo.equipe.nome}
                </Text>
                <Text
                  style={{
                    color: '#7A7A79',
                    fontSize: 13,
                    textTransform: 'uppercase',
                    fontFamily: 'Oswald-Regular',
                  }}>
                  {modalInfo?.data?.scheduleInfo.equipe.nomeApresentacao}
                </Text>
                <Text
                  style={{
                    marginTop: 15,
                    fontSize: 10,
                    color: '#859091',
                    fontWeight: '400',
                    textTransform: 'uppercase',
                    fontFamily: 'Oswald-Light',
                  }}>
                  {modalInfo?.data?.scheduleInfo.equipe.bairro}/
                  {modalInfo?.data?.scheduleInfo.equipe.cidade}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 15,
                  marginBottom: 15,
                  marginLeft: 10,
                }}>
                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: 60,
                    }}>
                    <Image
                      source={imgCalendarioVerde}
                      style={{
                        marginLeft: 17,
                        marginTop: -3,
                        width: 50,
                        height: 40,
                      }}
                    />
                    <Text
                      style={{
                        left: -41,
                        top: 14,
                        fontSize: 12,
                      }}>
                      {Convert.stringTodateShort(
                        modalInfo?.data?.scheduleInfo.data,
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: 90,
                      height: 30,
                    }}>
                    <Image
                      source={imgRelogio}
                      style={{
                        marginLeft: 17,
                        marginTop: -3,
                        width: 50,
                        height: 40,
                      }}
                    />
                    <Text
                      style={{
                        top: 13,
                        fontSize: 12,
                      }}>
                      {Convert.stringToTimeShort(
                        modalInfo?.data?.scheduleInfo.data,
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: 90,
                    }}>
                    <Image
                      source={imgBussola}
                      style={{
                        marginLeft: 17,
                        marginTop: -3,
                        width: 50,
                        height: 40,
                      }}
                    />
                    <Text
                      style={{
                        top: 13,
                        fontSize: 12,
                      }}>
                      {modalInfo?.data?.scheduleInfo.painel.distancia} Km
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: 90,
                    }}>
                    <Image
                      source={imgTrofeu}
                      style={{
                        marginLeft: 30,
                        marginTop: -3,
                        width: 50,
                        height: 40,
                      }}
                    />
                    <Text
                      style={{
                        top: 13,
                        fontSize: 12,
                      }}>
                      52
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <TouchableOpacity
                style={{
                  marginLeft: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={imgAlerta}
                    style={{
                      marginTop: -3,
                      width: 70,
                      height: 60,
                    }}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 5,
                    color: '#9F9F9F',
                    fontFamily: 'Oswald-Regular',
                    marginLeft: 13,
                  }}>
                  ALERTAS
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={imgAvaliacao}
                    style={{
                      marginTop: -3,
                      width: 70,
                      height: 60,
                    }}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 5,
                    color: '#9F9F9F',
                    marginLeft: 8,
                    fontFamily: 'Oswald-Regular',
                  }}>
                  AVALIAÇÃO
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginRight: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={imgLocal}
                    style={{
                      marginTop: -3,
                      width: 70,
                      height: 60,
                    }}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 5,
                    color: '#9F9F9F',

                    fontFamily: 'Oswald-Regular',
                    marginLeft: 19,
                  }}>
                  LOCAL
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderTopColor: '#ccc',
                borderTopWidth: 1,
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                marginTop: 15,
                paddingTop: 15,
              }}>
              <Text
                style={{
                  color: '#258F07',
                  fontFamily: 'Oswald-Regular',
                }}>
                AVISOS IMPORTANTES
              </Text>
              <Text style={{color: '#9F9F9F', marginTop: 10, marginBottom: 10}}>
                Como você está tentando marcar jogo para uma data de feriado,
                certifique-se de você terá número de jogadores suficientes para
                o jogo. Não deixe para cancelar o jogo na última hora. Além de
                evitar multas para sua equipe, você contribui para que a equipe
                adversária procure adversários disponíveis para esta data. Caso
                seja de seu interesse, bloqueie a data ou a semana em que sua
                equipe não está disponível.
              </Text>
            </View>
            <TouchableOpacity onPress={onCloseInformation}>
              <View
                style={{
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Image
                  source={imgBola}
                  style={{marginRight: 5, width: 80, height: 80}}></Image>
                <Text
                  style={{
                    color: '#258F07',
                    fontFamily: 'Oswald-Regular',
                  }}>
                  CONFIRMAR AGENDAMENTO
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ModalInformation>
    </>
  );
};

export default ScheduleGame;
