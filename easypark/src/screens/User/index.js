import React, { useState, useEffect } from 'react';
import { Container, ImageEllipsis, SquareBlue, ModalBlack, ModalBlue, ModalContent, TextContainer, TitleName, InfoContent, Label } from './styles';
import { View, TouchableOpacity, StatusBar, Text } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

import EllipsisBlue from '../../assets/EllipsisBlue.png';

import Api from '../../Api.js';
import CustomButton from '../../components/Button';

export default () => {

    const [token, setToken] = useState(null);
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");

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

    const getUser = async () => {
        try {
            const userId = await getTokenFromStorage();
            const res = await Api.getUserByID(userId, token);
            setName(res.name);
            setCpf(res.cpf);
            setEmail(res.email);
        } catch (error) {
            console.error('Error getting user:', error);
        }
    };

    useEffect(() => {
        getUser();
    }, [token]);

    return (
        <Container>
            <StatusBar translucent barStyle="white" />
            <SquareBlue />
            <ImageEllipsis source={EllipsisBlue} />
            <TitleName>Meus Dados</TitleName>
            <Label style={{marginTop: 35}}>Nome</Label>
            <InfoContent>
                <Text style={{marginLeft: 10, fontSize: 15}}>{name}</Text>
            </InfoContent>
            <Label>CPF</Label>
            <InfoContent>
                <Text style={{marginLeft: 10, fontSize: 15}}>{cpf}</Text>
            </InfoContent>
            <Label>E-mail</Label>
            <InfoContent>
                <Text style={{marginLeft: 10, fontSize: 15}}>{email}</Text>
            </InfoContent>
            <Label style={{marginTop: 20, textAlign: 'center'}}>Alterar Senha</Label>
            <Label style={{marginTop: 10}}>Senha Atual</Label>
            <InfoContent>
                <Text style={{marginLeft: 10, fontSize: 15}}>Digite sua senha atual</Text>
            </InfoContent>
            <Label>Nova Senha</Label>
            <InfoContent>
                <Text style={{marginLeft: 10, fontSize: 15}}>Digite sua nova senha</Text>
            </InfoContent>
            <Label>E-mail</Label>
            <InfoContent>
                <Text style={{marginLeft: 10, fontSize: 15}}>Confirme sua nova senha</Text>
            </InfoContent>
            <CustomButton
                color="#1AD61A"
                width="200px"
                height="55px"
                fontSize="25px" 
                textColor="#ffffff"
                text="Salvar e sair"
                borderRadius="50px"
                marginTop="8%"
            />
        </Container>
    );
}