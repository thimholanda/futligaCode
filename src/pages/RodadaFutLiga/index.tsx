import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {useAuth} from '../../hooks/auth';
import MainView from '../../components/MainView';
import {RegularBar} from '../../components/RegularBar';
import MainContainer from '../../components/MainContainer';
import RegularBackground from '../../components/RegularBackground';
import {styles} from './styles';
import Loading from '../../components/Loading';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  CalendarioService,
  RankingsService,
  RodadasFutLigaService,
} from '../../services';
import {Convert} from '../../utils';
import {Row} from '../../components/Row';
import RegularScroll from '../../components/RegularScroll';
import {FlatList} from 'react-native-gesture-handler';
import ScheduleItem from '../../components/ScheduleItem';
import {AdjustableImage} from '../../components/AdjustableImage';
import {Tab, TabView} from 'react-native-elements';
import ModalInformation from '../../components/ModalInformation';
import {Modalize} from 'react-native-modalize';

const RodadaFutLiga: React.FC = navigation => {
  const {loggedUser, urls} = useAuth();

  const {params} = navigation.route.params;

  const modalInformationRef = useRef<Modalize>(null);
  const [loadingRoot, setLoadingRoot] = useState(true);
  const [loadingParticipantes, setLoadingParticipantes] = useState(false);

  const [filterAno, setFilterAno] = useState('');
  const [filterUnidade, setFilterUnidade] = useState('');
  const [filterRankings, setFilterRankings] = useState('');
  const [filterSemana, setFilterSemana] = useState('');

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState('0');
  const [items1, setItems1] = useState([]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState('0');
  const [items2, setItems2] = useState([]);

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState('0');
  const [items3, setItems3] = useState([]);

  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState('0');
  const [items4, setItems4] = useState([]);

  const [participantesList, setParticipantesList] = useState([]);
  const [jogosList, setJogosList] = useState([]);
  const [modalInformationIndex, setModalInformationIndex] = useState(0);

  const anoFetch = useCallback(async () => {
    let response = await RodadasFutLigaService.getTemporadas();

    setItems1(
      response.map(item => {
        return {label: item.ano, value: item.ano};
      }),
    );
    // setValue2('0');
    // setValue3('0');
    // setValue4('0');
  }, []);

  const unidadeFetch = useCallback(async (filterAno: number) => {
    let response = await RodadasFutLigaService.getUnidades({
      ano: filterAno,
    });

    setItems2(
      response.map(item => {
        return {label: item.nome, value: item.unidadeId};
      }),
    );
    // setValue3('0');
    // setValue4('0');
  }, []);

  useEffect(() => {
    if (filterAno) unidadeFetch(filterAno);
  }, [filterAno]);

  const rankingsFetch = useCallback(
    async (filterAno: number, filterUnidade) => {
      let response = await RodadasFutLigaService.getRankings({
        ano: filterAno,
        unidade: filterUnidade,
      });

      setItems3(
        response.map(item => {
          return {label: item.descricaoComercial, value: item.rankingId};
        }),
      );
      // setValue4('0');
    },
    [],
  );

  useEffect(() => {
    if (filterAno && filterUnidade) rankingsFetch(filterAno, filterUnidade);
  }, [filterAno, filterUnidade]);

  const semanaFetch = useCallback(async (filterAno, filterRankings) => {
    let response = await RodadasFutLigaService.getRodadas({
      ano: filterAno,
      ranking: filterRankings,
    });

    setItems4(
      response.map(item => {
        return {label: item.numeroSemana, value: item.numeroSemana};
      }),
    );
  }, []);

  useEffect(() => {
    if (filterAno && filterRankings) semanaFetch(filterAno, filterRankings);
  }, [filterAno, filterRankings]);

  const participantesFetch = useCallback(
    async (filterAno, filterRankings, filterSemana) => {
      let response = await RodadasFutLigaService.getParticipantee({
        ano: filterAno,
        ranking: filterRankings,
        semana: filterSemana,
      });

      setParticipantesList(response);
    },
    [],
  );

  const jogosFetch = useCallback(
    async (filterAno, filterRankings, filterSemana) => {
      let response = await RodadasFutLigaService.jogos({
        ano: filterAno,
        ranking: filterRankings,
        semana: filterSemana,
      });

      setJogosList(response);
    },
    [],
  );

  useEffect(() => {
    if (filterAno && filterRankings && filterSemana) {
      setLoadingParticipantes(true);
      participantesFetch(filterAno, filterRankings, filterSemana)
        .then(() => {
          jogosFetch(filterAno, filterRankings, filterSemana);
        })
        .then(() => {
          setLoadingParticipantes(false);
        });
    }
  }, [filterAno, filterRankings, filterSemana]);

  const participantes = useMemo(() => {
    return participantesList;
  }, [participantesList]);

  const jogos = useMemo(() => {
    return jogosList?.resultados;
  }, [jogosList]);

  const onOpenInformation = () => {
    modalInformationRef.current?.open();
  };

  useEffect(() => {
    setLoadingRoot(false);
    anoFetch();
  }, []);

  return (
    <>
      <MainView>
        <RegularBar title="Rodada FutLiga" rightAction={onOpenInformation} />
        <MainContainer>
          <RegularBackground />
          <View>
            {loadingRoot ? (
              <Loading />
            ) : (
              <View style={styles.container}>
                {loadingParticipantes ? (
                  <Loading />
                ) : (
                  <View style={{zIndex: 1, padding: 10}}>
                    <Text>Equipes Participantes</Text>
                    <View style={{height: 300}}>
                      <Tab
                        value={modalInformationIndex}
                        onChange={setModalInformationIndex}>
                        <Tab.Item
                          type={'solid'}
                          buttonStyle={{backgroundColor: '#fff'}}
                          titleStyle={{
                            height: 30,
                            color: '#000000',
                          }}
                          title={'Mandantes'}
                        />
                        <Tab.Item
                          type={'solid'}
                          buttonStyle={{backgroundColor: '#fff'}}
                          titleStyle={{
                            height: 30,
                            color: '#000000',
                          }}
                          title={'Visitantes'}
                        />
                      </Tab>
                      <TabView
                        value={modalInformationIndex}
                        onChange={setModalInformationIndex}>
                        <TabView.Item
                          style={{
                            backgroundColor: 'white',
                            width: '100%',
                          }}>
                          <FlatList
                            style={{marginTop: 10}}
                            data={participantes.mandantes}
                            keyExtractor={(item: object, index: number) =>
                              String(index)
                            }
                            renderItem={({item}) => (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  padding: 10,
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    alignContent: 'flex-start',
                                    width: 50,
                                    height: 50,
                                  }}>
                                  <Text>{item.posicao}</Text>
                                  <AdjustableImage
                                    style={{marginTop: -35, marginLeft: 30}}
                                    size="100%"
                                    isUri={true}
                                    image={`${urls.distintivos}${item.distintivo}`}
                                  />
                                </View>
                                <Text>{item.nomeApresentacao}</Text>
                                <Text>{item.jogoAgendado}</Text>
                              </View>
                            )}
                            showsVerticalScrollIndicator={false}></FlatList>
                        </TabView.Item>
                        <TabView.Item
                          style={{backgroundColor: 'white', width: '100%'}}>
                          <FlatList
                            style={{marginTop: 10}}
                            data={participantes.visitantes}
                            keyExtractor={(item: object, index: number) =>
                              String(index)
                            }
                            renderItem={({item}) => (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  padding: 10,
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    alignContent: 'flex-start',
                                    width: 50,
                                    height: 50,
                                  }}>
                                  <Text>{item.posicao}</Text>
                                  <AdjustableImage
                                    style={{marginTop: -35, marginLeft: 30}}
                                    size="100%"
                                    isUri={true}
                                    image={`${urls.distintivos}${item.distintivo}`}
                                  />
                                </View>
                                <Text>{item.nomeApresentacao}</Text>
                                <Text>{item.jogoAgendado}</Text>
                              </View>
                            )}
                            showsVerticalScrollIndicator={false}></FlatList>
                        </TabView.Item>
                      </TabView>
                    </View>
                    <Text>Jogos Agendados</Text>
                    <FlatList
                      style={{marginTop: 10}}
                      data={jogos}
                      keyExtractor={(item: object, index: number) =>
                        String(index)
                      }
                      renderItem={({item}) => (
                        <TouchableOpacity
                          style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                            paddingBottom: 10,
                          }}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignContent: 'center',
                              marginBottom: 20,
                            }}>
                            <Text style={{fontSize: 10}}>
                              Segunda, {item.dataJogo} as {item.horaInicio}
                            </Text>
                            <Text style={{fontSize: 10}}>
                              {item.local.nomeApresentacao}
                            </Text>
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              alignContent: 'center',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignContent: 'center',
                                marginRight: 20,
                              }}>
                              <View
                                style={{
                                  width: 50,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  alignContent: 'center',
                                }}>
                                <Text style={{fontSize: 10}}>
                                  {item.mandante.nomeApresentacao}
                                </Text>
                                <Text style={{fontSize: 10}}>
                                  ({item.mandante.posicionamento.posicao})
                                </Text>
                              </View>
                              <View
                                style={{
                                  width: 80,
                                  height: 50,
                                  marginRight: 10,
                                }}>
                                <AdjustableImage
                                  size="100%"
                                  isUri={true}
                                  image={`${urls.distintivos}${item.mandante.distintivo}`}
                                />
                              </View>
                              <View>
                                <Text>{item.resultados[0].placarMandante}</Text>
                                <Text>{item.resultados[1].placarMandante}</Text>
                              </View>
                            </View>
                            <Text>x</Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignContent: 'center',
                                marginLeft: 20,
                              }}>
                              <View>
                                <Text>
                                  {item.resultados[0].placarVisitante}
                                </Text>
                                <Text>
                                  {item.resultados[1].placarVisitante}
                                </Text>
                              </View>
                              <View
                                style={{
                                  width: 80,
                                  height: 50,
                                  marginLeft: 10,
                                  marginRight: 10,
                                }}>
                                <AdjustableImage
                                  size="100%"
                                  isUri={true}
                                  image={`${urls.distintivos}${item.visitante.distintivo}`}
                                />
                              </View>
                              <View
                                style={{
                                  width: 50,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  alignContent: 'center',
                                }}>
                                <Text style={{fontSize: 10}}>
                                  {item.visitante.nomeApresentacao}
                                </Text>
                                <Text style={{fontSize: 10}}>
                                  ({item.visitante.posicionamento.posicao})
                                </Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )}
                      showsVerticalScrollIndicator={false}></FlatList>
                  </View>
                )}
              </View>
            )}
          </View>
        </MainContainer>
      </MainView>
      <ModalInformation modalizeRef={modalInformationRef} title="Filtro">
        <View>
          <Text>Ano:</Text>
          <View style={{zIndex: 13}}>
            <DropDownPicker
              style={{marginBottom: 10}}
              open={open1}
              value={filterAno}
              items={items1}
              setOpen={setOpen1}
              setValue={setFilterAno}
              setItems={setItems1}
              // onChangeValue={value => {
              //   unidadeFetch();
              // }}
            />
          </View>
          <Text>Unidade:</Text>
          <View style={{zIndex: 12}}>
            <DropDownPicker
              style={{marginBottom: 10}}
              open={open2}
              value={filterUnidade}
              items={items2}
              setOpen={setOpen2}
              setValue={setFilterUnidade}
              setItems={setItems2}
              // onChangeValue={value => {
              //   rankingsFetch();
              // }}
            />
          </View>
          <Text>Rankings:</Text>
          <View style={{zIndex: 11}}>
            <DropDownPicker
              style={{marginBottom: 10}}
              open={open3}
              value={filterRankings}
              items={items3}
              setOpen={setOpen3}
              setValue={setFilterRankings}
              setItems={setItems3}
              // onChangeValue={value => {
              //   semanaFetch();
              // }}
            />
          </View>
          <Text>Semana:</Text>
          <View style={{zIndex: 10}}>
            <DropDownPicker
              style={{marginBottom: 10}}
              open={open4}
              value={filterSemana}
              items={items4}
              setOpen={setOpen4}
              setValue={setFilterSemana}
              setItems={setItems4}
              // onChangeValue={value => {
              //   setLoadingParticipantes(true);
              //   participantesFetch().then(() => {
              //     jogosFetch().then(() => {
              //       setLoadingParticipantes(false);
              //     });
              //   });
              // }}
            />
          </View>
        </View>
      </ModalInformation>
    </>
  );
};

export default RodadaFutLiga;
