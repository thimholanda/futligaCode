import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import {useAuth} from '../../hooks/auth';
import MainView from '../../components/MainView';
import {RegularBar} from '../../components/RegularBar';
import MainContainer from '../../components/MainContainer';
import RegularBackground from '../../components/RegularBackground';
import {styles} from './styles';
import Loading from '../../components/Loading';

const DefaultPage: React.FC = navigation => {
  const {loggedUser} = useAuth();
  const {params} = navigation.route.params;
  const [loadingRoot, setLoadingRoot] = useState(true);

  useEffect(() => {
    setLoadingRoot(false);
    console.log(params);
  }, []);

  return (
    <>
      <MainView>
        <RegularBar title="PADRAO" />
        <MainContainer>
          <RegularBackground />
          <View style={styles.container}>
            {loadingRoot ? <Loading /> : <Text>Convidar</Text>}
          </View>
        </MainContainer>
      </MainView>
    </>
  );
};

export default DefaultPage;
