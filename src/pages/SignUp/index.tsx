/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useRef} from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';

import {
  Container,
  ImageBackground,
  Title,
  BacktoSignInContainer,
  BacktoSignIn,
  BacktoSignInText,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {SafeAreaView} from 'react-navigation';
import logoImg from '../../assets/logo.png';
import imgBg from '../../assets/bg-signin.png';
import getValidationErrors from '../../utils/getValidationErrors';

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  interface SignUpFormData {
    name: string;
    email: string;
    password: string;
  }

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    formRef.current?.setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      //await api.post('/users', data);
      //history.push('/');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
      Alert.alert('Erro no cadastro', 'Ocorreu um erro ao fazer o cadastro.');
    }
  }, []);

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
            <ImageBackground source={imgBg}>
              <SafeAreaView forceInset={{bottom: 'never'}}>
                <Image
                  resizeMode="contain"
                  style={{marginTop: 40, marginBottom: 22}}
                  source={logoImg}
                />
              </SafeAreaView>
              <View>
                <Title>Crie sua conta.</Title>
              </View>
              <Form ref={formRef} onSubmit={handleSignUp}>
                <Input
                  onSubmitEditing={() => {
                    emailInputRef.current?.focus();
                  }}
                  returnKeyType="next"
                  autoCorrect={true}
                  autoCapitalize="words"
                  name="name"
                  icon="user"
                  placeholder="Nome"
                />
                <Input
                  onSubmitEditing={() => {
                    passwordInputRef.current?.focus();
                  }}
                  ref={emailInputRef}
                  returnKeyType="next"
                  keyboardType="email-address"
                  autoCorrect={false}
                  autoCapitalize="none"
                  name="email"
                  icon="mail"
                  placeholder="E-mail"
                />
                <Input
                  ref={passwordInputRef}
                  onSubmitEditing={() => {
                    formRef.current?.submitForm();
                  }}
                  returnKeyType="send"
                  secureTextEntry
                  textContentType="newPassword"
                  name="password"
                  icon="lock"
                  placeholder="Senha"
                />
              </Form>
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}>
                Criar
              </Button>
            </ImageBackground>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BacktoSignInContainer>
        <BacktoSignIn
          onPress={() => {
            navigation.navigate('SignIn');
          }}>
          <Icon name="arrow-left" size={20} color="white" />
          <BacktoSignInText>Voltar para login</BacktoSignInText>
        </BacktoSignIn>
      </BacktoSignInContainer>
    </>
  );
};

export default SignUp;
