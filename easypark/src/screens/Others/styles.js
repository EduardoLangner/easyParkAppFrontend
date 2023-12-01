import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #ffffff;
    flex: 1;
    justify-content: flex-start;
    align-items: center;
`

export const SquareBlue = styled.View`
    width: 100%;
    height: 150px;
    background-color: #6B92A4;
    top: 0;
    z-index: 1;
`

export const ImageEllipsis = styled.Image`
    width: 110%;
    height: 150px;
    margin-top: -15%;
    z-index: 1;
`

export const ModalContent = styled.View`
    flex: 1;
    position: absolute; /* Adicione esta linha para sobrepor outros elementos */
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    flex-direction: row;
    z-index: 3;
`

export const ModalBlue = styled.View`
    flex: 3; /* Ajuste conforme necessário */
    height: 100%;
    background-color: #6B92A4;
`

export const ModalBlack = styled.View`
    flex: 1; /* Ajuste conforme necessário */
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);   
`

export const TextContainer = styled.View`
    align-items: center;
    margin-top: 10%;
    flex-direction: row;
`