import React from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { View, Button, Image, StatusBar, Text } from 'react-native';

import { useAuth } from '../../hooks/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ImageBackgroundDashboard } from '../SignIn/styles';
import imgBg from '../../assets/bg-db.png';
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan.','Fev.','Mar.','Abr.','Mai.','Junh.','Jul..','Ago.','Set.','Out.','Nov.','Dez.'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sáb.'],
  today: 'Aujourd\'hui'
};


const Dashboard: React.FC = () => {
    LocaleConfig.defaultLocale = 'fr';
    const {signOut} = useAuth();
    return (
        <>
        <View style={{flex: 1, paddingTop: 50}} >

            <StatusBar hidden />
            
            <View style={{flexDirection: 'row', height: 50, backgroundColor: '#717e7f', paddingBottom: 10, marginTop: 0, marginBottom: 10}}>
                
                <TouchableOpacity
                    onPress={signOut}
                    style={{ flex: 1, justifyContent: 'center' }}
                >   
                    <Image style={{width: 30, height: 21, marginLeft: 20}} source={ require('../../../src/assets/voltar.png') } resizeMode="contain"/>
                </TouchableOpacity>

                <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontFamily: 'Oswald-Light', fontSize: 28}}>MARCAR JOGO</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Image style={{width: 27, height: 30, marginRight: 20}} source={ require('../../../src/assets/sino.png') } resizeMode="contain"/>
                </View>

            </View>         
        
            
            <View style={{backgroundColor: 'white', flex: 1}}>
                    
                    <Calendar
                        theme={{
                            arrowColor: '#666',
                        }}
                        firstDay={1}
                        style={{ width: '100%' }}
                        markedDates={{
                            '2021-03-23': {selected: true, marked: true, dotColor:'#d9534f' , selectedColor: '#f0ad4e' },
                            '2021-03-25': {selected: true, marked: false, selectedColor: '#d9534f', disabled: true, disableTouchEvent: true},
                            '2021-03-28': {disabled: true, disableTouchEvent: true},
                            '2021-03-01': {selected: true, marked: true, selectedColor: '#00d67c', dotColor:'#d9534f'},
                        }}
                    />
                    <View style={{ backgroundColor: 'white', flex: 1 }}>
                        
                        <ImageBackgroundDashboard source={imgBg}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}> 

                                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20 }}>
                                    <View style={{ width: 12, height: 12, backgroundColor: '#f0ad4e', marginRight: 5, borderRadius: 50}}></View>
                                    <Text style={{fontFamily: 'Oswald-Regular', color: '#666', fontSize: 15}}>FERIADO</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20 }}>
                                    <View style={{ width: 12, height: 12, backgroundColor: '#d9534f', marginRight: 5, borderRadius: 50}}></View>
                                    <Text style={{fontFamily: 'Oswald-Regular', color: '#666', fontSize: 15}}>FECHADO</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20 }}>
                                    <View style={{ width: 12, height: 12, backgroundColor: '#5bc0de', marginRight: 5, borderRadius: 50}}></View>
                                    <Text style={{fontFamily: 'Oswald-Regular', color: '#666', fontSize: 15}}>DATA FUTLIGA</Text>
                                </View>
                            </View>
                        
                        </ImageBackgroundDashboard>
                        
                    </View>
                </View>



            </View>
            
        </>
    );
};

export default Dashboard;
