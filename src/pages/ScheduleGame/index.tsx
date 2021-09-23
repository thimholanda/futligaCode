import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Modalize} from 'react-native-modalize';
import {Tab, TabView} from 'react-native-elements';

import {styles} from './styles';
import {CalendarioService} from '../../services';
import {Convert} from '../../utils';
import {TypeGame} from '../../enums';
import {ScheduleResponse} from '../../models';
import {useAuth} from '../../hooks/auth';
import {RegularBar} from '../../components/RegularBar';
import MainView from '../../components/MainView';
import ScheduleItem from '../../components/ScheduleItem';
import Loading from '../../components/Loading';
import MainContainer from '../../components/MainContainer';
import RegularBackground from '../../components/RegularBackground';
import ModalInformation from '../../components/ModalInformation';
import imgStar from '../../assets/icons8-star-48.png';

const ScheduleGame: React.FC = navigation => {
  const {loggedUser} = useAuth();
  const {params} = navigation.route.params;
  const [loadingRoot, setLoadingRoot] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [scheduleGameData, setScheduleGameData] = useState<ScheduleResponse>();
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
  }, [page, filterRodada, filter]);

  const onOpenInformation = (value: object) => {
    setModalInfo(value);
    modalInformationRef.current?.open();
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

  return (
    <>
      <MainView>
        <RegularBar
          title="AGENDAR JOGO"
          rightAction={() => {
            onOpenInformation({
              type: 5,
              title: 'Filtro',
            });
          }}
        />
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
            <FlatList
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
      </ModalInformation>
    </>
  );
};

export default ScheduleGame;
