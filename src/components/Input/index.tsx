import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState, useCallback } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';
import { color } from 'react-native-reanimated';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

interface inputValueReference{
    value: string;
}

interface InputRef{
    focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps | any> = ({name, icon, ... rest}, ref) => {
    
    const inputElementRef = useRef<inputValueReference | any>({value: ''});

    const {registerField, defaultValue = '', fieldName, error} = useField(name)

    const inputValueRef = useRef<inputValueReference>({value: defaultValue});

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleInputFocus = useCallback(()=>{
        setIsFocused(true);
    },[])

    const handleInputBlur = useCallback(()=>{
        setIsFocused(!!inputValueRef.current.value);        
    },[]);

    useImperativeHandle(ref, () => ({
        focus(){
            inputElementRef.current.focus();
        }
    }) );

    useEffect(()=>{
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref:any, value){
                inputElementRef.current.value = value;
                inputElementRef.current.setNativeProps({text: value});
            },
            clearValue(){
                inputElementRef.current.value='';
                inputElementRef.current.clear();
            }
        })
    },[fieldName, registerField]);

    return(
        <Container isFocused={isFocused} isErrored={!!error}>
        <Icon name={icon} size={20} color={isFocused || isFilled ? "#51b653" : "#666360"} />
        <TextInput
            underlineColorAndroid="transparent"
            placeholderTextColor= "#666360"
            ref={inputElementRef}
            defaultValue={defaultValue}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChangeText={(value:any) => {inputValueRef.current.value = value}}

            {... rest } 
        />
    </Container>
    );
};

export default forwardRef(Input);