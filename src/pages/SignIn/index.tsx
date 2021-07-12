import React, { useCallback, useEffect, useRef } from 'react';
import { Image, View, ScrollView, KeyboardAvoidingView, Platform, StatusBar, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile'
import * as Yup from 'yup';
import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, ImageBackground, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText, ContainerCreateAccountButton} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';
import imgBg from '../../assets/bg-signin.png';
import { FormHandles } from '@unform/core';


interface SignInFormData{
    email: string;
    password: string;
}

const SignIn: React.FC = () => {

    const passwordInputRef = useRef<TextInput>(null);
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();
    
    const {signIn, user} = useAuth();

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
                    //console.log(err.value);
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);

                    return;
                }

                Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, cheque as credenciais.');
            }
        },
        [signIn],
    );

    return (
    <>
        <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flex: 1 }}
            >
                <Container>
                    < StatusBar hidden />
                    <ImageBackground source={imgBg}>
                        <Image source={logoImg} />
                        <View>
                            <Title>
                                Conecte-se a maior liga{"\n"} de futebol amador do Brasil. 
                            </Title>
                        </View>
                        <Form ref={formRef} onSubmit={handleSignIn}>
                            <Input 
                                autoCorrect={false}
                                autoCapitalize= "none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={()=>{passwordInputRef.current?.focus()}}
                                name="email" icon="mail" placeholder="E-mail"
                            />
                            <Input
                                ref={passwordInputRef}
                                secureTextEntry={true}
                                returnKeyType="send"
                                name="password" icon="lock" placeholder="Senha"
                                onSubmitEditing={()=>{formRef.current?.submitForm()}}
                            />
                        </Form>
                        <Button 
                                onPress={()=>{
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
        
        <ContainerCreateAccountButton>
            <CreateAccountButton onPress={() => {navigation.navigate('SignUp')}}>
                <Icon name="log-in" size={20} color='white' />
                <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
            </CreateAccountButton>
        </ContainerCreateAccountButton>
        
    </>
)
};

export default SignIn;