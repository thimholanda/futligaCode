import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Text, View} from 'react-native';

import {useAuth} from '../../hooks/auth';
import MainView from '../../components/MainView';
import {RegularBar} from '../../components/RegularBar';
import MainContainer from '../../components/MainContainer';
import RegularBackground from '../../components/RegularBackground';
import {styles, TimeInfo} from './styles';
import Loading from '../../components/Loading';
import {RankingsService, RodadasFutLigaService} from '../../services';
import {AdjustableImage} from '../../components/AdjustableImage';
import {FlatList} from 'react-native-gesture-handler';
import {Modalize} from 'react-native-modalize';
import DropDownPicker from 'react-native-dropdown-picker';
import ModalInformation from '../../components/ModalInformation';

const RankingPage: React.FC = navigation => {
  const {loggedUser} = useAuth();
  const {params} = navigation.route.params;
  const [loadingRoot, setLoadingRoot] = useState(true);
  const [ranking, setRanking] = useState([]);
  const modalFilterRef = useRef<Modalize>(null);

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState('0');
  const [items1, setItems1] = useState([{label: 'São Paulo', value: '0'}]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState('0');
  const [items2, setItems2] = useState([
    {label: 'Futsal Masculino', value: '0'},
  ]);

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState('0');
  const [items3, setItems3] = useState([{label: 'Rodada 1', value: '0'}]);

  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState('0');
  const [items4, setItems4] = useState([{label: 'Mandante', value: '0'}]);

  const rankingFetch = async () => {
    let response = await RankingsService.getMandante({
      ranking: 2,
      ano: 2021,
      pagina: 1,
    });
    setRanking(response.ranking);
    setLoadingRoot(false);
  };

  const handleModalFilter = () => {
    modalFilterRef.current?.open();
  };

  useEffect(() => {
    rankingFetch();
  }, []);

  return (
    <>
      <MainView>
        <RegularBar title="Ranking" rightAction={handleModalFilter} />
        <MainContainer>
          <RegularBackground />
          <View style={styles.container}>
            {loadingRoot ? (
              <Loading />
            ) : (
              <View>
                <FlatList
                  data={ranking}
                  keyExtractor={(item: object, index: number) => String(index)}
                  renderItem={({item}) => (
                    <View
                      style={{
                        backgroundColor: 'white',
                        padding: 10,
                      }}>
                      <Text>{item.equipe.nomeApresentacao}</Text>
                      <View style={{}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            alignContent: 'flex-start',
                          }}>
                          <TimeInfo>PV: {item.ranking.pontosValidos}</TimeInfo>
                          <TimeInfo>
                            (%): {item.ranking.aproveitamento}
                          </TimeInfo>
                          <TimeInfo>J: {item.ranking.jogos}</TimeInfo>
                          <TimeInfo>V: {item.ranking.pontosGanhos}</TimeInfo>
                          <TimeInfo>E: {item.ranking.empates}</TimeInfo>
                          <TimeInfo>D: {item.ranking.derrotas}</TimeInfo>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            alignContent: 'flex-start',
                          }}>
                          <TimeInfo>GP: {item.ranking.golsPro}</TimeInfo>
                          <TimeInfo>GC: {item.ranking.golsContra} </TimeInfo>
                          <TimeInfo>SG: {item.ranking.saldo}</TimeInfo>
                          <TimeInfo>VWO: {item.ranking.vitoriasWO}</TimeInfo>
                          <TimeInfo>DWO: {item.ranking.derrotasWO}</TimeInfo>
                        </View>
                      </View>
                    </View>
                  )}
                  showsVerticalScrollIndicator={false}></FlatList>
              </View>
            )}
          </View>
        </MainContainer>
      </MainView>
      <ModalInformation modalizeRef={modalFilterRef} title="Filtro">
        <View>
          <Text>Unidade:</Text>
          <View style={{zIndex: 12}}>
            <DropDownPicker
              style={{marginBottom: 10}}
              open={open1}
              value={value1}
              items={items1}
              setOpen={setOpen1}
              setValue={setValue1}
              // onChangeValue={value => {
              //   rankingsFetch();
              // }}
            />
          </View>
          <Text>Rankings:</Text>
          <View style={{zIndex: 11}}>
            <DropDownPicker
              style={{marginBottom: 10}}
              open={open2}
              value={value2}
              items={items2}
              setOpen={setOpen2}
              setValue={setValue2}
              // onChangeValue={value => {
              //   semanaFetch();
              // }}
            />
          </View>
          <Text>Rodadas:</Text>
          <View style={{zIndex: 10}}>
            <DropDownPicker
              style={{marginBottom: 10}}
              open={open3}
              value={value3}
              items={items3}
              setOpen={setOpen3}
              setValue={setValue3}
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
          <Text>Tipo:</Text>
          <View style={{zIndex: 10}}>
            <DropDownPicker
              style={{marginBottom: 10}}
              open={open4}
              value={value4}
              items={items4}
              setOpen={setOpen4}
              setValue={setValue4}
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

export default RankingPage;
