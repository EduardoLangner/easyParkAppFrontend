import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    background-color: #ffffff;`

export const ImageBackGround = styled.Image`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
`;

export const ImageLogo = styled.Image`
    align-items: center;    
    width: 60%; 
    height: 20%; 
    margin-top: 5%; 
    resize-mode: contain; 
`;

export const SignUpText = styled.Text`
    font-weight: bold;
    font-size: 28px;
    margin-top: 0%;
    color: #ffffff;
`

export const InputArea = styled.View`
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
    width: 85%;
    height: 350px;
    border-radius: 20px; 
    margin-top: 5%;
    display:flex;
`

export const InputContainer = styled.View`
    width: 87%;
    height: 350px;
    display: flex;
    margin-top: 15%;
`

export const ImageEllipsis = styled.Image`
    width: 120%;
    position: absolute;
    margin-top: 715px;
    z-index: 0;
    height: 20%;
`

export const SignUpButtonSignIn = styled.TouchableOpacity`
    align-items: center;
    width: 100%;
    height: 60px; 
    flex-direction: row;
    justify-content: center; 
    z-index: 2;
    margin-top: 5%;
`

export const SignUpButtonSignInText = styled.Text`
    font-size: ${props => (props.fontSize ? props.fontSize : '16px')};
    color: ${props => (props.textColor ? props.textColor : '#000000')};
    font-weight: bold;
`