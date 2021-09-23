import React, {useEffect, useMemo, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useAuth} from '../../hooks/auth';
import MainView from '../../components/MainView';
import {RegularBar} from '../../components/RegularBar';
import MainContainer from '../../components/MainContainer';
import RegularBackground from '../../components/RegularBackground';
import {styles} from './styles';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import {AdjustableImage} from '../../components/AdjustableImage';
import {Convert} from '../../utils';
import RegularScroll from '../../components/RegularScroll';

const InviteGame: React.FC = navigation => {
  const {loggedUser, urls} = useAuth();
  const handleNavigation = useNavigation();
  const {params} = navigation.route.params;
  const [loadingRoot, setLoadingRoot] = useState(true);

  useEffect(() => {
    setLoadingRoot(false);
  }, []);

  const avatar = useMemo(() => {
    return (
      loggedUser.distintivo && `${urls.distintivos}${loggedUser.distintivo}`
    );
  }, [loggedUser, urls]);

  const avatarAdversary = useMemo(() => {
    return (
      loggedUser.distintivo &&
      `${urls.distintivos}${params.scheduleInfo.equipe.distintivo}`
    );
  }, [loggedUser, urls]);

  return (
    <>
      <MainView>
        <RegularBar title="CONVIDAR" />
        <MainContainer>
          <RegularBackground />
          <RegularScroll>
            <View style={styles.container}>
              {loadingRoot ? (
                <Loading />
              ) : (
                <View style={{}}>
                  <View style={{backgroundColor: 'white', padding: 10}}>
                    <View style={{alignItems: 'center'}}>
                      <Text>
                        {Convert.stringTodate(
                          params.scheduleInfo.data,
                          'dd/MM/yyyy',
                        )}{' '}
                        - ?? horas
                      </Text>
                      <Text>??? Local</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        alignContent: 'flex-start',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                        <AdjustableImage
                          size="50%"
                          isUri={true}
                          image={avatar}
                        />
                        <View>
                          <Text>{loggedUser.nomeApresentacao}</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                        <AdjustableImage
                          size="50%"
                          isUri={true}
                          image={avatarAdversary}
                        />
                        <View>
                          <Text>
                            {params.scheduleInfo.equipe.nomeApresentacao}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Text>Data do Jogo: ???</Text>
                    <Text>Local: ???</Text>
                    <Text>
                      Endereço: {params.scheduleInfo.equipe.bairro} {' - '}
                      {params.scheduleInfo.equipe.cidade} {' / '}
                      {params.scheduleInfo.equipe.uf}
                    </Text>
                  </View>
                  <View>
                    <Button
                      onPress={() => {
                        Alert.alert('', 'Enviado com Sucesso!', [
                          {
                            text: 'OK',
                            onPress: () => handleNavigation.goBack(),
                          },
                        ]);
                      }}>
                      ENVIAR
                    </Button>
                  </View>
                  <View style={{backgroundColor: '#fcf8e3', padding: 10}}>
                    <Text
                      style={{
                        marginTop: 10,
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      Alerta de Feriado
                    </Text>
                    <Text style={{marginTop: 10}}>
                      Feriado prolongado de 04/09/2021 a 07/09/2021 -
                      Independência do Brasil
                    </Text>
                    <Text style={{marginTop: 10}}>
                      Como você está tentando marcar jogo para uma data de
                      feriado, certifique-se de você terá número de jogadores
                      suficientes para o jogo. Não deixe para cancelar o jogo na
                      última hora. Além de evitar multas para sua equipe, você
                      contribui para que a equipe adversária procure adversários
                      disponíveis para esta data. Caso seja de seu interesse,
                      bloqueie a data ou a semana em que sua equipe não está
                      disponível.
                    </Text>
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

export default InviteGame;
