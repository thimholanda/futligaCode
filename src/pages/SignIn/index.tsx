/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useRef, useState} from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import * as Yup from 'yup';
import {useAuth} from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  ImageBackground,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
  ContainerCreateAccountButton,
  CreateAccountButtonIcon,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';
import imgBg from '../../assets/bg-signin.png';
import {FormHandles} from '@unform/core';
import {SafeAreaView} from 'react-navigation';
import DropDownPicker from 'react-native-dropdown-picker';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const passwordInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const {signIn} = useAuth();

  //Mock:Begin
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    {
      label: '--- MOCK (USUARIO) ---',
      value: '',
    },
    {
      label: 'usuario329@futliga.com.br',
      value: 'usuario329@futliga.com.br',
    },
    {
      label: 'usuario2632@futliga.com.br',
      value: 'usuario2632@futliga.com.br',
    },
    {
      label: 'usuario15078@futliga.com.br',
      value: 'usuario15078@futliga.com.br',
    },
    {
      label: 'usuario572@futliga.com.br',
      value: 'usuario572@futliga.com.br',
    },
  ]);

  const handleChangeUserMock = (value: any) => {
    handleSignIn({
      email: value,
      password: 'senha',
    });
  };
  //Mock:End

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais.',
        );
      }
    },
    [signIn],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <Container>
            <StatusBar hidden />
            <ImageBackground source={imgBg}>
              <SafeAreaView forceInset={{bottom: 'never'}}>
                <Image
                  resizeMode="contain"
                  style={{marginTop: 40, marginBottom: 22}}
                  source={logoImg}
                />
              </SafeAreaView>

              <View>
                <Title>
                  Conecte-se a maior liga{'\n'} de futebol amador do Brasil.
                </Title>
              </View>
              <Form ref={formRef} onSubmit={handleSignIn}>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    passwordInputRef.current?.focus();
                  }}
                  name="email"
                  icon="mail"
                  placeholder="E-mail"
                />
                <Input
                  ref={passwordInputRef}
                  secureTextEntry={true}
                  returnKeyType="send"
                  name="password"
                  icon="lock"
                  placeholder="Senha"
                  onSubmitEditing={() => {
                    formRef.current?.submitForm();
                  }}
                />
              </Form>
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}>
                Entrar
              </Button>

              <ForgotPassword onPress={() => {}}>
                <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
              </ForgotPassword>
            </ImageBackground>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <DropDownPicker
        style={{alignContent: 'center'}}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={value => {
          handleChangeUserMock(value);
        }}
      />
      <ContainerCreateAccountButton>
        <CreateAccountButton
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          {/*<CreateAccountButtonIcon source={} size={20} color="white" />*/}
          <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
        </CreateAccountButton>
      </ContainerCreateAccountButton>
    </>
  );
};

export default SignIn;
