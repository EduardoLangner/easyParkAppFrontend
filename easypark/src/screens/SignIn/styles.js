import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    background-color: #ffffff;
`

export const ImageSignupShort = styled.Image`
    width: 100%;
    height: 23%;
    resize-mode: cover;
`

export const SignInButtonSignUp = styled.View`
    align-items: center;
    position: absolute;
    z-index: 2;
    width: 100px;
    flex-direction: row;
    margin-top: 5%
`

export const SignInButtonSignUpText = styled.Text`
    font-size: ${props => (props.fontSize ? props.fontSize : '16px')};
    color: ${props => (props.textColor ? props.textColor : '#000000')};
    font-weight: bold;
    top: 10%;
`

export const ImageEllipsis = styled.Image`
    width: 100%;
    position: absolute;
    top: -6%;

`
export const ImageLogo = styled.Image`
    align-items: center;    
    width: 65%; 
    height: 20%; 
    position: absolute;
    top: 25%; 
    resize-mode: contain; 
`

export const LoginText = styled.Text`
    font-weight: bold;
    font-size: 28px;
    top: 25%;
    align-items: center;
    font-weight: bold;
`
export const InputArea = styled.View`
    align-items: center;    
    margin-top: 51%; 
    width: 87%;
`

export const CustomButton = styled.TouchableOpacity`
    background-color: #6B92A4;
    border-radius: 12px;
    align-items: center;
    margin-top: 10%;
    width: 100%;
    height: 20%;
    justify-content: center;
`

export const CustomButtonText = styled.Text`
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
`
export const SocialLogosContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: -10%;

`

export const GoogleLogo = styled.Image`
    width: 13%;
    height: 50px;    
    margin-right: 10%x;
`

export const FacebookLogo = styled.Image`
    width: 13%;
    height: 50px;     
    margin-right: 1%;
`

export const TwitterLogo = styled.Image`
    width: 13%;
    height: 50px; 
`

export const ButtonForgePassword = styled.TouchableOpacity`
    margin-top: 16px;
`

export const ButtonForgePasswordText = styled.Text`
    color: #007bff;
    font-size: 16px;
`