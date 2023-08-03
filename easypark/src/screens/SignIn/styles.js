import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #ffffff;
    align-items: center;
    width: 100%;
`

export const ImageSignupShort = styled.Image`
    width: 100%;
    max-height: 15%;
    min-height: 15%;
`

export const SignInButtonSignUp = styled.TouchableOpacity`
    align-items: center;
    flex-direction: row;
    z-index: 2;
    margin-top: -27%;
`

export const SignInButtonSignUpText = styled.Text`
    font-size: ${props => (props.fontSize ? props.fontSize : '16px')};
    color: ${props => (props.textColor ? props.textColor : '#000000')};
    font-weight: bold;
`

export const ImageEllipsis = styled.Image`
    width: 140%;    
    max-height: 25%;
    min-height: 20%;
    margin-top: 5%;
`
export const ImageLogo = styled.Image`
    width: 70%;    
    height: 110px;
    z-index: 2;
    margin-top: -30%;
`

export const LoginText = styled.Text`
    font-size: 30px;
    font-weight: bold;
    margin-top: 10%;
`

export const InputArea = styled.View`
    align-items: center;
    width: 85%;
    height: 15%;
    margin-top: 10%;
`
export const SocialLogosContainer = styled.View`
    flex-direction: row;
    width: 70%;
    height: 7%;
    margin-top: 20%;
    justify-content: space-between;
`   

export const GoogleLogo = styled.Image`
    width: 20%;
    height: 80%;
`

export const FacebookLogo = styled.Image`
    width: 20%;
    height: 80%;
`

export const TwitterLogo = styled.Image`
    width: 20%;
    height: 80%;
`

export const ButtonForgetPassword = styled.TouchableOpacity`
    width: 70%;
    align-items: center;
    margin-top: 5%;
`

export const ButtonForgetPasswordText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    text-decoration: underline;
`