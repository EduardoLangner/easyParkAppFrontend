import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';


export const Container = styled.SafeAreaView`
    background-color: #ffffff;
    flex: 1;
    justify-content: flex-start; /* Alterado para alinhar no topo */
    align-items: center;
    z-index: 1;
`

export const SquareBlue = styled.View`
    width: 100%;
    height: 120px;
    background-color: #6B92A4;
    top: 0;
    z-index: 2;
`

export const ImageEllipsis = styled.Image`
    width: 110%;
    height: 150px;
    margin-top: -25%;
    z-index: 1;
`

export const CustomTextContainer = styled.View`
    margin-top: ${props => props.marginTop || '25%'};
    align-items: center;
    justify-content: center;
    z-index: 3;
`

export const CustomText = styled.Text`
    font-size: ${props => props.fontSize || '30px'};
    color: ${props => props.color || '#000000'};
`

export const AddPlateContainer = styled.View`
    align-items: center;
    flex-direction: row;
    z-index: 2;
    margin-top: -30%;
`

export const AddPlateText = styled.Text`
    font-size: 25px;
    color: #ffffff;
`

export const ImageCar = styled.Image`
    width: 30%;    
    height: 50px;
`

export const InputArea = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
`

export const InformationTexT = styled.Text`
    font-size: 22px;
    color: #000000;
    text-align: center;
    margin-top: 10%;
`

export const Chip = styled.Image`
`