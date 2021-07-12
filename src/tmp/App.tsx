import * as React from 'react';
import {useRef} from 'react';
import { Text, Button, View, StatusBar, Image, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, useLinkProps } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Modalize } from 'react-native-modalize';
import styled from 'styled-components/native';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import imgBg from './src/assets/bg-signin.png';
import SplashScreen from 'react-native-splash-screen';

const CustomHeader = React.forwardRef((props, ref) => (

    <View style={{flexDirection: 'row', height: 50, backgroundColor: '#717e7f', paddingBottom: 10, marginTop: 10, marginBottom: 5}}>

    {
      props.isHome?
      <TouchableOpacity 
        style={{ flex: 1, justifyContent: 'center' }}

        
        onPress={() => {props.isTeam ? props.navigation.navigate('HomeBarsTeam') : props.navigation.navigate('HomeBars') }}
      >
        <Image style={{width: 30, height: 21, marginLeft: 20}} source={ require('./src/assets/menu.png') } resizeMode="contain"/>
      </TouchableOpacity>
      :
      <TouchableOpacity 
        style={{ flex: 1, justifyContent: 'center' }}
        onPress={() => props.navigation.goBack() }
      >
        <Image style={{width: 17, height: 30, marginLeft: 20}} source={ require('./src/assets/voltar.png') } resizeMode="contain"/>
      </TouchableOpacity>
    }
      <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>

        {
          props.isHome?
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => ref.current?.open()}>
            <Text style={{color: 'white', fontFamily: 'Oswald-Light', fontSize: 28}}>{props.title}</Text>
            <Image style={{width: 25, height: 25, borderRadius: 100, marginLeft: 5}} source={ require('./src/assets/icon-arrow-down.png') } resizeMode="contain"/>
            </TouchableOpacity>
          :
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'white', fontFamily: 'Oswald-Light', fontSize: 28}}>{props.title}</Text>
            </TouchableOpacity>
        }
        
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', opacity: props.isHome? 1 : 0 }}>
        <Image style={{width: 27, height: 30, marginRight: 20}} source={ require('./src/assets/sino.png') } resizeMode="contain"/>
      </View>
    </View>
  ));

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function Noticias2({navigation}) {
  return (
    <View style={{ backgroundColor: '#717e7f', flex: 1}}>
      <SafeAreaView>
        < StatusBar hidden />
        <CustomHeader title="FERAS F7"  navigation={navigation} />
      </SafeAreaView>
      <ScrollView style={{flex: 1, flexDirection: "column"}}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Noticias')}
        >
          <Image style={{width: '100%', height: '100%', aspectRatio: 0.514}} resizeMode='contain' source={ require('./src/assets/home8.png') }></Image>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function Noticias({navigation}) {
  return (
    <View style={{ backgroundColor: '#717e7f', flex: 1}}>
      <SafeAreaView>
        < StatusBar hidden />
        <CustomHeader title="FERAS F7"  navigation={navigation} />
      </SafeAreaView>
      <ScrollView style={{flex: 1, flexDirection: "column"}}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Noticias2')}
        >
          <Image style={{width: '100%', height: '100%', aspectRatio: 0.516}} resizeMode='contain' source={ require('./src/assets/home7.png') }></Image>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function Feras({navigation}) {
  return (
    <View style={{ backgroundColor: '#717e7f', flex: 1}}>
      <SafeAreaView>
        < StatusBar hidden />
        <CustomHeader title="FERAS F7"  navigation={navigation} />
      </SafeAreaView>
      <ScrollView style={{flex: 1, flexDirection: "column"}}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Noticias')}
        >
          <Image style={{width: '100%', height: '100%', aspectRatio: 0.513}} resizeMode='contain' source={ require('./src/assets/home6.png') }></Image>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function TimesSigo({navigation}) {
  return (
    <View style={{ backgroundColor: '#717e7f', flex: 1}}>
      <SafeAreaView>
        < StatusBar hidden />
        <CustomHeader title="MEU PERFIL"  navigation={navigation} />
      </SafeAreaView>
      <ScrollView style={{flex: 1, flexDirection: "column"}}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Feras')}
        >
          <Image style={{width: '100%', height: '100%', aspectRatio: 0.517}} resizeMode='contain' source={ require('./src/assets/home5.png') }></Image>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function DadosPessoais({navigation}) {
  return (
    <View style={{ backgroundColor: '#717e7f', flex: 1}}>
      <SafeAreaView>
        < StatusBar hidden />
        <CustomHeader title="MEU PERFIL"  navigation={navigation} />
      </SafeAreaView>
      <ScrollView style={{flex: 1, flexDirection: "column"}}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('TimesSigo')}
        >
          <Image style={{width: '100%', height: '100%', aspectRatio: 0.516}} resizeMode='contain' source={ require('./src/assets/home4.png') }></Image>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function MeuPerfil({navigation}) {
  return (
    <View style={{ backgroundColor: '#717e7f', flex: 1}}>
      <SafeAreaView>
        < StatusBar hidden />
        <CustomHeader title="MEU PERFIL"  navigation={navigation} />
      </SafeAreaView>
      <ScrollView style={{flex: 1, flexDirection: "column"}}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('DadosPessoais')}
        >
          <Image style={{width: '100%', height: '100%', aspectRatio: 0.5175}} resizeMode="contain" source={ require('./src/assets/home3.png') }></Image>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function HomeScreenBars({navigation}) {

  const MyImage = styled.Image`
    width: 100%;
    aspect-ratio: .42;
    height: 100%;
  `;

  return (
    <View style={{ backgroundColor: '#717e7f', flex: 1}}>
      <SafeAreaView>
        < StatusBar hidden />
        <CustomHeader title="INÍCIO"  navigation={navigation} />
      </SafeAreaView>
      <ScrollView style={{flex: 1, flexDirection: "column"}}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('SignIn')}
        >
          <MyImage source={ require('./src/assets/menu-usuario.png') }></MyImage>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function HomeScreenBarsTeam({navigation}) {
  
  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const MyImage = styled.Image`
    width: 100%;
    aspect-ratio: .42;
    height: 100%;
  `;

  const MyImage2 = styled.Image`
    width: 100%;
    aspect-ratio: .60;
    height: 100%;
  `;

  return (
    <>
    
    <View style={{ backgroundColor: '#717e7f', flex: 1}}>
      <SafeAreaView>
        < StatusBar hidden />
        <CustomHeader title="INÍCIO" navigation={navigation} />
      </SafeAreaView>
      <ScrollView style={{flex: 1, flexDirection: "column"}}>
        <TouchableOpacity 
          onPress={onOpen}
        >
          <MyImage source={ require('./src/assets/menu-team.png') }></MyImage>
        </TouchableOpacity>
      </ScrollView>
    </View>

    <Modalize 
      ref={modalizeRef}
      modalStyle={{backgroundColor: 'rgba(0,0,0,.8)'}}
      overlayStyle={{backgroundColor: 'rgba(255,255,255,.5)'}}
      adjustToContentHeight = {true}
    >
      <MyImage2 source={ require('./src/assets/menu-team-2.png') }></MyImage2>
    </Modalize>

    </>
  );
}

function HomeTeam({navigation}) {

  const modalizeRef = useRef<Modalize>(null);

  const MyImage = styled.Image`
    width: 100%;
    height: 100%;
    aspect-ratio: 0.514;
  `;
  
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (

    <>

    <View style={{ backgroundColor: '#717e7f', flex: 1}}>

      <SafeAreaView>
        <StatusBar hidden />
        <CustomHeader title="CENTRAL CITY" isHome={true} isTeam={true} navigation={navigation} ref={modalizeRef} />
      </SafeAreaView>

      <ScrollView style={{flex: 1, flexDirection: "column"}}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('SignIn')}
        >
          
          <MyImage source={ require('./src/assets/home-time.png') }></MyImage>
        </TouchableOpacity>
      </ScrollView>

    </View>

    <Modalize 
        adjustToContentHeight = {true}
        ref={modalizeRef} 
      >

        <View style={{ 
          flex: 1,
          flexDirection: 'column',
          alignContent: 'center'
        
          }}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 20}}>
              <Image style={{width: 60, height: 60, borderRadius: 100, marginRight: 10}} source={ require('./src/assets/icon-central-city.png') } resizeMode="contain"/>
              <Text style={{ fontFamily: 'Oswald-Regular', color: 'green', fontSize: 20 }} >Central City</Text>
            </View>

            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>

              <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20}}>
                <TouchableOpacity style={{ borderWidth: 1, borderColor: '#dddddd', paddingVertical: 3, paddingHorizontal: 5, borderRadius: 5 }}>
                  <Text style={{ fontFamily: 'Oswald-Regular', color: 'black', fontSize: 18 }}>Seguindo 4 times</Text>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20}}>
                <TouchableOpacity style={{ borderWidth: 1, borderColor: '#dddddd', paddingVertical: 3, paddingHorizontal: 5, borderRadius: 5 }}>
                  <Text style={{ fontFamily: 'Oswald-Regular', color: 'black', fontSize: 18 }}>Procurar times</Text>
                </TouchableOpacity>
              </View>

            </View>

            

            <TouchableOpacity style={{ borderTopWidth: 1, borderTopColor: '#dddddd', backgroundColor: '#eeeeee' }}
              onPress={() => navigation.navigate('Home')}
            >
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 20}}>
                <Image style={{width: 60, height: 60, borderRadius: 100, marginRight: 10}} source={ require('./src/assets/ricardo.png') } resizeMode="contain"/>
                <Text style={{ fontFamily: 'Oswald-Regular', color: 'black', fontSize: 18 }} >Acessar como Ricardo</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#dddddd', paddingHorizontal: 20, paddingVertical: 40}}>
              <Image style={{width: 30, height: 30, borderRadius: 100, marginLeft: 13, marginRight: 26}} source={ require('./src/assets/icon-plus.png') } resizeMode="contain"/>
              <Text style={{ fontFamily: 'Oswald-Regular', color: 'black', fontSize: 18 }} >Adicionar conta</Text>
            </TouchableOpacity>
          
        </View>

      </Modalize>

    </>
  );
}

function HomeUser({navigation}) {

  const modalizeRef = useRef<Modalize>(null);

  const MyImage = styled.Image`
    width: 100%;
    height: 100%;
    aspect-ratio: 0.514;
  `;
  
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (

    <>

    <View style={{ backgroundColor: '#717e7f', flex: 1}}>

      <SafeAreaView>
        <StatusBar hidden />
        <CustomHeader title="RICARDO" isHome={true} navigation={navigation} ref={modalizeRef} />
      </SafeAreaView>

      <ScrollView style={{flex: 1, flexDirection: "column"}}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('MeuPerfil')}
        >
          
          <MyImage source={ require('./src/assets/home-usuario.png') }></MyImage>
        </TouchableOpacity>
      </ScrollView>

    </View>

    <Modalize 
        adjustToContentHeight = {true}
        ref={modalizeRef} 
      >

        <View style={{ 
          flex: 1,
          flexDirection: 'column',
          alignContent: 'center'
        
          }}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 20}}>
              <Image style={{width: 60, height: 60, borderRadius: 100, marginRight: 10}} source={ require('./src/assets/ricardo.png') } resizeMode="contain"/>
              <Text style={{ fontFamily: 'Oswald-Regular', color: 'green', fontSize: 20 }} >Ricardo</Text>
            </View>

            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>

              <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20}}>
                <TouchableOpacity style={{ borderWidth: 1, borderColor: '#dddddd', paddingVertical: 3, paddingHorizontal: 5, borderRadius: 5 }}>
                  <Text style={{ fontFamily: 'Oswald-Regular', color: 'black', fontSize: 18 }}>Seguindo 4 times</Text>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20}}>
                <TouchableOpacity style={{ borderWidth: 1, borderColor: '#dddddd', paddingVertical: 3, paddingHorizontal: 5, borderRadius: 5 }}>
                  <Text style={{ fontFamily: 'Oswald-Regular', color: 'black', fontSize: 18 }}>Procurar times</Text>
                </TouchableOpacity>
              </View>

            </View>

            

            <TouchableOpacity 
              style={{ borderTopWidth: 1, borderTopColor: '#dddddd', backgroundColor: '#eeeeee' }}
              onPress={() => navigation.navigate('HomeTeam')}
            >
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 20}}>
                <Image style={{width: 60, height: 60, borderRadius: 100, marginRight: 10}} source={ require('./src/assets/icon-central-city.png') } resizeMode="contain"/>
                <Text style={{ fontFamily: 'Oswald-Regular', color: 'black', fontSize: 18 }} >Administrar Central City</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#dddddd', paddingHorizontal: 20, paddingVertical: 40}}>
              <Image style={{width: 30, height: 30, borderRadius: 100, marginLeft: 13, marginRight: 26}} source={ require('./src/assets/icon-plus.png') } resizeMode="contain"/>
              <Text style={{ fontFamily: 'Oswald-Regular', color: 'black', fontSize: 18 }} >Adicionar conta</Text>
            </TouchableOpacity>
          
        </View>

      </Modalize>

    </>

    

  );
}

function HomeScreen({navigation}) {

  const modalizeRef = useRef<Modalize>(null);
  
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <>
      <View style={{ backgroundColor: '#717e7f', flex: 1}}>

      <SafeAreaView>
        < StatusBar hidden />
        <CustomHeader title="RICARDO" isHome={true} navigation={navigation} ref={modalizeRef} />
      </SafeAreaView>

      <ImageBackground style={{flex: 1, width: '100%'}} source={ imgBg }>

        <ScrollView style={{flex: 1, flexDirection: "column", padding: 2, paddingBottom: 100}}>

            <View style={{flex: 1, flexDirection: 'row'}}>

              <TouchableOpacity 
                style={{flex: 1, padding: 3}}
              >
                <ImageBackground style={{width: '100%'}} source={ require('./src/assets/bg.png') }>

                  <View style={{width: '100%', aspectRatio: .9}}>

                    <ImageBackground style={{width: '100%', height: 40, justifyContent: 'center'}} source={ require('./src/assets/bg-text.png') }>
                      <Text style={{color: 'green', fontFamily: 'Oswald-Light', fontSize: 21, paddingLeft: 10}}>MEU PERFIL</Text>
                    </ImageBackground>

                  </View>

                  </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity style={{flex: 1, padding: 3}}>
                <ImageBackground style={{width: '100%'}} source={ require('./src/assets/bg.png') }>
                  <View style={{width: '100%', aspectRatio: .9}}>

                    <ImageBackground style={{width: '100%', height: 40, justifyContent: 'center'}} source={ require('./src/assets/bg-text.png') }>
                      <Text style={{color: 'green', fontFamily: 'Oswald-Light', fontSize: 21, paddingLeft: 10}}>PRÓXIMO JOGO</Text>
                    </ImageBackground>

                  </View>
                  </ImageBackground>
              </TouchableOpacity>

            </View>

            <View style={{flex: 1, flexDirection: 'row'}}>

              <TouchableOpacity 
                style={{flex: 1, padding: 3}}
                onPress={() => navigation.navigate('MeuPerfil')}
              >
                <ImageBackground style={{width: '100%'}} source={ require('./src/assets/bg.png') }>
                  <View style={{width: '100%', aspectRatio: 1.7}}>

                    <ImageBackground resizeMode='stretch' style={{width: '100%', height: 40, justifyContent: 'center'}} source={ require('./src/assets/bg-text.png') }>
                      <Text style={{color: 'green', fontFamily: 'Oswald-Light', fontSize: 21, paddingLeft: 10}}>ESTATÍSTICAS DO ÚLTIMO JOGO</Text>
                    </ImageBackground>

                  </View>
                  </ImageBackground>
              </TouchableOpacity>

            </View>

            <View style={{flex: 1, flexDirection: 'row'}}>

              <TouchableOpacity 
                style={{flex: 1, padding: 3}}
                onPress={() => navigation.navigate('MeuPerfil')}
              >
                <ImageBackground style={{width: '100%'}} source={ require('./src/assets/bg.png') }>
                  <View style={{width: '100%', aspectRatio: .9}}>

                    <ImageBackground style={{width: '100%', height: 40, justifyContent: 'center'}} source={ require('./src/assets/bg-text.png') }>
                      <Text style={{color: 'green', fontFamily: 'Oswald-Light', fontSize: 21, paddingLeft: 10}}>RANKING</Text>
                    </ImageBackground>

                  </View>
                  </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity style={{flex: 1, padding: 3}}>
                <ImageBackground style={{width: '100%'}} source={ require('./src/assets/bg.png') }>
                  <View style={{width: '100%', aspectRatio: .9}}>

                    <ImageBackground style={{width: '100%', height: 40, justifyContent: 'center'}} source={ require('./src/assets/bg-text.png') }>
                      <Text style={{color: 'green', fontFamily: 'Oswald-Light', fontSize: 21, paddingLeft: 10}}>TIMES QUE SIGO</Text>
                    </ImageBackground>

                  </View>
                  </ImageBackground>
              </TouchableOpacity>

            </View>

            <View style={{flex: 1, flexDirection: 'row', padding: 3, marginBottom: 3}}>

              <TouchableOpacity 
                style={{flex: 1, width: '100%', height: 60, backgroundColor: 'green', borderColor: 'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}
                onPress={() => navigation.navigate('MeuPerfil')}
              >
                <Text style={{ fontFamily: 'Oswald-Light', color: 'white', fontSize: 22 }}>BUSCAR TIMES</Text>
              </TouchableOpacity>

            </View>

        </ScrollView>
      </ImageBackground>
    </View>

      <Modalize 
        adjustToContentHeight = {true}
        ref={modalizeRef} 
      >

        <View style={{ 
          flex: 1,
          flexDirection: 'column',
          alignContent: 'center'
        
          }}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 20}}>
              <Image style={{width: 60, height: 60, borderRadius: 100, marginRight: 10}} source={ require('./src/assets/ricardo.png') } resizeMode="contain"/>
              <Text style={{ fontFamily: 'Oswald-Regular', color: 'green', fontSize: 20 }} >Ricardo</Text>
            </View>

            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>

              <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20}}>
                <TouchableOpacity style={{ borderWidth: 1, borderColor: '#dddddd', paddingVertical: 3, paddingHorizontal: 5, borderRadius: 5 }}>
                  <Text style={{ fontFamily: 'Oswald-Regular', color: 'black', fontSize: 18 }}>Seguindo 4 times</Text>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20}}>
                <TouchableOpacity style={{ borderWidth: 1, borderColor: '#dddddd', paddingVertical: 3, paddingHorizontal: 5, borderRadius: 5 }}>
                  <Text style={{ fontFamily: 'Oswald-Regular', color: 'black', fontSize: 18 }}>Procurar times</Text>
                </TouchableOpacity>
              </View>

            </View>

            

            <TouchableOpacity style={{ borderTopWidth: 1, borderTopColor: '#dddddd', backgroundColor: '#eeeeee' }}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 20}}>
                <Image style={{width: 60, height: 60, borderRadius: 100, marginRight: 10}} source={ require('./src/assets/icon-central-city.png') } resizeMode="contain"/>
                <Text style={{ fontFamily: 'Oswald-Regular', color: 'black', fontSize: 18 }} >Administrar Central City</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#dddddd', paddingHorizontal: 20, paddingVertical: 40}}>
              <Image style={{width: 30, height: 30, borderRadius: 100, marginLeft: 13, marginRight: 26}} source={ require('./src/assets/icon-plus.png') } resizeMode="contain"/>
              <Text style={{ fontFamily: 'Oswald-Regular', color: 'black', fontSize: 18 }} >Adicionar conta</Text>
            </TouchableOpacity>
          
        </View>

      </Modalize>
    
    </>
  );
}

function HomeScreenDetail({navigation}) {
  return (
    <View style={{ backgroundColor: '#717e7f', flex: 1}}>
      <SafeAreaView style={{ flex: 1 }}>
        < StatusBar hidden />
        <CustomHeader title="Home detail" navigation={navigation}/>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
          <Text>Home Detail!</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

function SettingsScreen({navigation}) {
  return (
    <View style={{ backgroundColor: '#717e7f', flex: 1}}>
      <SafeAreaView style={{ flex: 1 }}>
        < StatusBar hidden />
        <CustomHeader title="Settings" isHome={true} navigation={navigation}/>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
          <Text>Settings!</Text>
          <TouchableOpacity 
            style={{backgroundColor: 'red'}}
            onPress={() => navigation.navigate('SettingsDetail')}
          >
            <Text>Go settings detail!</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

function SettingsScreenDetail({navigation}) {
  return (
    <View style={{ backgroundColor: '#717e7f', flex: 1}}>
      <SafeAreaView style={{ flex: 1 }}>
        < StatusBar hidden />
        <CustomHeader title="Settings Detail" navigation={navigation}/>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
          <Text>Settings Detail!</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}


const StackHome = createStackNavigator();
const StackSettings = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const navOptionHandler = () => ({
  headerShown: false
});

function HomeStack() {
  return (
    <StackHome.Navigator initialRouteName="Home">
      <StackHome.Screen name="Home" component={HomeUser} options={navOptionHandler} />
      <StackHome.Screen name="HomeTeam" component={HomeTeam} options={navOptionHandler} />
      <StackHome.Screen name="HomeBars" component={HomeScreenBars} options={navOptionHandler} />
      <StackHome.Screen name="HomeBarsTeam" component={HomeScreenBarsTeam} options={navOptionHandler} />
      <StackHome.Screen name="MeuPerfil" component={MeuPerfil} options={navOptionHandler} />
      <StackHome.Screen name="DadosPessoais" component={DadosPessoais} options={navOptionHandler} />
      <StackHome.Screen name="TimesSigo" component={TimesSigo} options={navOptionHandler} />
      <StackHome.Screen name="Feras" component={Feras} options={navOptionHandler} />
      <StackHome.Screen name="Noticias" component={Noticias} options={navOptionHandler} />
      <StackHome.Screen name="Noticias2" component={Noticias2} options={navOptionHandler} />
    </StackHome.Navigator>
  )
}

function SettingsStack() {
  return (
    <StackSettings.Navigator initialRouteName="Settings">
      <StackSettings.Screen name="Settings" component={SettingsScreen} options={navOptionHandler} />
      <StackSettings.Screen name="SettingsDetail" component={SettingsScreenDetail} options={navOptionHandler} />
    </StackSettings.Navigator>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  )
}

function DrawerNavigator()
{
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="MenuTab" component={TabNavigator} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  )
}

const Auth = createStackNavigator();

export default function App() {

  React.useEffect(() => {
    //verificações
    SplashScreen.hide();
  }, []);

  return (

      <NavigationContainer>
        <Auth.Navigator
          screenOptions={{
              headerShown: false,
              cardStyle: {backgroundColor: '#312e38'},
          
          }}
        >
          <Auth.Screen name="SignIn" component={SignIn} />
          <Auth.Screen name="SignUp" component={SignUp} />
          <Auth.Screen name="Dashboard" component={HomeStack} />
          
        </Auth.Navigator>
      </NavigationContainer>

  );
}