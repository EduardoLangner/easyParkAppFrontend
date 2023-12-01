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
            <Label style={{marginTop: 55}}>Posso ter mais de um veículo cadastrado?</Label>
            <Text style={{marginTop: 5, fontSize: 15, width: '90%'}}>Concerteza! Pode cadastrar quantos veículos desejar.</Text>
            <Label>É seguro informar os dados do meu cartão no aplicativo?</Label>
            <Text style={{marginTop: 5, fontSize: 15, width: '90%'}}>Ótima pergunta! Os dados do seu cartão são protegidos pelos rigorosos padrões de segurança PCI-DSS! </Text>
            <Label>O mapa realmente mostra os dados em tempo real?</Label>
            <Text style={{marginTop: 5, fontSize: 15, width: '90%'}}>Mostra sim. As vagas são atualizadas instantamente a cada mudança de status.</Text>
            <Label>Quero trocar de senha, consigo redefini-la?</Label>
            <Text style={{marginTop: 5, fontSize: 15, width: '90%'}}>Para redefinir sua senha basta ir no menu "outros" e acessar a tela Meus Dados, lá encontram-se os passos necessários para realizar a troca da sua senha!</Text>
        </Container>
    );
}