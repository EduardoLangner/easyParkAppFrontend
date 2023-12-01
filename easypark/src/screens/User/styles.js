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
        height: 50px;
        background-color: #6B92A4;
        top: 0;
        z-index: 2;
    `

    export const ImageEllipsis = styled.Image`
        width: 110%;
        height: 150px;
        margin-top: -15%;
        z-index: 1;
    `

    export const TitleName = styled.Text`
        font-size: 25px;
        color: #ffffff;
        font-weight: bold;
        margin-top: -20%;
        z-index: 3;
    `

    //crir um input com o nome do usuário

    export const InfoContent = styled.View`
        width: 90%;
        height: 50px;
        background-color: #ffffff;
        margin-top: 2%;
        border-radius: 50px;
        border: 1px solid #000000;
        align-items: flex-start;
        justify-content: center;
    `

    export const Label = styled.Text`
        font-size: 18px;
        color: #000000;
        font-weight: bold;
        margin-top:2%;
        z-index: 3;
        text-align: left;
        width: 82%;
    `