import React, { useState, useEffect } from 'react';
import { Container, ImageEllipsis, SquareBlue, ModalBlack, ModalBlue, ModalContent, TextContainer } from './styles';
import { View, TouchableOpacity, StatusBar, Text } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { useNavigation } from '@react-navigation/native';

import EllipsisBlue from '../../assets/EllipsisBlue.png';

import CustomButton from '../../components/Button';

import Api from '../../Api.js';

export default () => {

    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

    const navigation = useNavigation();

    const handleMeusDadosPress = () => {
        navigation.navigate('User');
    };

    const handleMeusVeiculossPress = () => {
        navigation.navigate('Vehicles');
    };

    const handlePerguntasPress = () => {
        navigation.navigate('Answers');
    };

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

    const handleLogoutModal = () => {
        setLogoutModalVisible(true);
    };

    const closeLogoutModal = () => {
        setLogoutModalVisible(false);
    };

    return (
        <Container>
            <SquareBlue />
            <ImageEllipsis source={EllipsisBlue} />
            <ModalContent>
                <ModalBlue>
                    <TouchableOpacity style={{marginTop: 30}} onPress={handleMeusDadosPress}>
                        <TextContainer style={{marginLeft: 20}}>
                            <Icon name="user" size={20} color="#fff" style={{marginLeft: 5}} />
                            <Text style={{color: "#fff", marginLeft: 10, fontSize: 20}}> Meus Dados</Text>
                        </TextContainer>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleMeusVeiculossPress}>
                        <TextContainer style={{marginLeft: 20}}>
                            <Icon name="car" size={20} color="#fff" />
                            <Text style={{color: "#fff", marginLeft: 8, fontSize: 20}}> Meus Veículos</Text>
                        </TextContainer>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <TextContainer style={{marginLeft: 22}}>
                            <Icon name="envelope" size={20} color="#fff" />
                            <Text style={{color: "#fff", marginLeft: 10, fontSize: 20}}> Fale Conosco</Text>
                        </TextContainer>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePerguntasPress}>
                        <TextContainer style={{marginLeft: 25}} >
                            <Icon name="question" size={28} color="#fff" />
                            <Text style={{color: "#fff", marginLeft: 10, fontSize: 20}}> Perguntas Frequentes</Text>
                        </TextContainer>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogoutModal}>
                        <TextContainer style={{marginLeft: 25}}>
                            <Icon name="sign-out" size={20} color="#fff" />
                            <Text style={{color: "#fff", marginLeft: 10, fontSize: 20}}> Sair</Text>
                        </TextContainer>
                    </TouchableOpacity>
                </ModalBlue>
                <ModalBlack />
            </ModalContent>
            <Modal isVisible={isLogoutModalVisible} style={{ justifyContent: 'center', alignItems: 'center', height: 10 }}>
                <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.7)" barStyle="white" />
                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', width: 300, height: 300, borderRadius: 20 }}>
                    <TouchableOpacity style={{ position: 'absolute', top: -20, right: -20, zIndex: 1 }} onPress={closeLogoutModal}>
                        <View style={{ width: 40, height: 40, backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="times" size={20} color="white" />
                        </View>
                    </TouchableOpacity>
                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 25, color: '#000000', fontWeight: 'bold', textAlign: 'center' }}>Deseja relamente sair?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '10%', width: "80%" }}>
                            <CustomButton
                                color="#1AD61A"
                                width="100px"
                                height="55px"
                                fontSize="25px" 
                                textColor="#ffffff"
                                text="Sim"
                                borderRadius="50px"
                            />
                            <CustomButton
                                color="#FF0000"
                                width="100px"
                                height="55px"
                                fontSize="25px" 
                                textColor="#ffffff"
                                text="Não"
                                borderRadius="50px"
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </Container>
    );
}