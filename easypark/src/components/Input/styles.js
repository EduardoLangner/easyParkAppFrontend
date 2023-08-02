import React from 'react';
import styled from 'styled-components/native';

export const InputArea = styled.View`
    width: 100%;
    height: 50px;
    background-color: transparent;
    flex-direction: row;
    align-items: center;
    border-bottom-width: 2px;
    border-bottom-color: #000000;
    margin-bottom: 5px;
`

export const Input = styled.TextInput`
    left: 15%;
    bottom: 0%;
    margin-bottom: -5%;
    width: 90%;
    font-size: 16px;
`

export const IconContainer = styled.View`
    bottom: 0%;
    margin-bottom: -5%;
`