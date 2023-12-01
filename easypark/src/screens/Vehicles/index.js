import React, { useState, useEffect } from 'react';
import { Container, ImageEllipsis, SquareBlue, ModalBlack, ModalBlue, ModalContent, TextContainer, TitleName, InfoContent, Label } from './styles';
import { View, TouchableOpacity, StatusBar, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

import EllipsisBlue from '../../assets/EllipsisBlue.png';

import Api from '../../Api.js';
import CustomButton from '../../components/Button';
import { resizeMethod } from 'deprecated-react-native-prop-types/DeprecatedImagePropType.js';

export default () => {

    const [token, setToken] = useState(null);
    const [plate, setPlate] = useState([]);

    const getTokenFromStorage = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            if (storedToken !== null) {
                const decodedToken = jwtDecode(storedToken);
                const userId = decodedToken.id;

                setToken(storedToken);
                return userId;
            } else {
                console.log('Token not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error getting token from AsyncStorage:', error);
        }
    };

    const getPlate = async () => {
        try {
            const userId = await getTokenFromStorage();
            const res = await Api.getPlate(userId, token);
            console.log(res)
            setPlate(res.length > 0 ? res[0].plate : "");
            console.log(plate)
        } catch (error) {
            console.error('Error getting plate:', error);
        }
    };

    useEffect(() => {
        getPlate();
    }, [token]);

    return (
        <Container>
            <StatusBar translucent barStyle="white" />
            <SquareBlue />
            <ImageEllipsis source={EllipsisBlue} />
            <TitleName>Meus Dados</TitleName>
            <Label style={{marginTop: 55, textAlign: 'center'}}>Veículos</Label>
            <Label style={{marginTop: 10}}>Placa</Label>
            <InfoContent>
                <Text style={{marginLeft: 10, fontSize: 15}}>{plate}</Text>
            </InfoContent>
            <CustomButton
                color="#1AD61A"
                width="200px"
                height="55px"
                fontSize="25px" 
                textColor="#ffffff"
                text="Cadastrar"
                borderRadius="50px"
                marginTop="8%"
            />
        </Container>
    );
}