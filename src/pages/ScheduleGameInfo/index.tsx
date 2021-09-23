import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, Text, View} from 'react-native';

import MainView from '../../components/MainView';
import {RegularBar} from '../../components/RegularBar';
import MainContainer from '../../components/MainContainer';
import RegularBackground from '../../components/RegularBackground';
import Loading from '../../components/Loading';
import {useAuth} from '../../hooks/auth';
import {styles} from './styles';
import {AdjustableImage} from '../../components/AdjustableImage';
import Button from '../../components/Button';
import RegularScroll from '../../components/RegularScroll';
import {useNavigation} from '@react-navigation/native';

const ScheduleGameInfo: React.FC = navigation => {
  const {loggedUser, urls} = useAuth();
  const handleNavigation = useNavigation();
  const {params} = navigation.route.params;
  const [loadingRoot, setLoadingRoot] = useState(true);

  const avatar = useMemo(() => {
    if (!params.information.equipe.distintivo)
      params.information.equipe.distintivo = '0-4.gif';
    return `${urls.distintivos}${params.information.equipe.distintivo}`;
  }, [params.information, urls]);

  useEffect(() => {
    setLoadingRoot(false);
  }, []);

  const handleInvite = useCallback(async () => {
    handleNavigation.navigate('InviteGame', {
      params: {
        scheduleInfo: params.information,
      },
    });
  }, []);

  return (
    <>
      <MainView>
        <RegularBar title={params.information.equipe.nomeApresentacao} />
        <MainContainer>
          <RegularBackground />
          <RegularScroll>
            <View style={styles.container}>
              {loadingRoot ? (
                <Loading />
              ) : (
                <View>
                  <View style={styles.contentInformation}>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          alignContent: 'center',
                        }}>
                        <View style={{flex: 1}}>
                          <AdjustableImage
                            style={styles.avatar}
                            size="80%"
                            isUri={true}
                            image={avatar}
                          />
                        </View>
                        <View
                          style={{
                            marginRight: 20,
                          }}>
                          <Text>{params.information.equipe.nome}</Text>
                          <Text>{params.information.equipe.cidade}</Text>
                          <Text>{params.information.equipe.bairro}</Text>
                          <Text>
                            {params.locaisMandoInfo?.modalidade?.descricao}
                          </Text>
                          <Text>{params.information.equipe?.regiaoCidade}</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          alignItems: 'center',
                          alignContent: 'center',
                        }}>
                        <Button style={{width: '50%'}} onPress={handleInvite}>
                          Agendar
                        </Button>

                        <Button style={{width: '50%'}} onPress={handleInvite}>
                          Seguir
                        </Button>
                      </View>
                    </View>
                  </View>
                  <View>
                    <View style={styles.contentInformationExtra1}>
                      <View style={{backgroundColor: 'red'}}>
                        <Text>Notícias</Text>
                      </View>
                      <View style={{backgroundColor: 'blue'}}>
                        <Text>Agenda</Text>
                      </View>
                    </View>
                    <View style={styles.contentInformationExtra2}>
                      <View style={{backgroundColor: 'yellow'}}>
                        <Text>Ranking</Text>
                      </View>
                      <View style={{backgroundColor: 'orange'}}>
                        <Text>Ranking</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </RegularScroll>
        </MainContainer>
      </MainView>
    </>
  );
};

export default ScheduleGameInfo;
