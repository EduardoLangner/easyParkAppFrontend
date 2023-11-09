import React, { useState, useEffect } from 'react';
import { Container, ImageEllipsis, SquareBlue, CustomTextTime, CustomTextTimeContainer, AddPlateContainer, AddPlateText, ImageCar, InputArea } from './styles';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import EllipsisBlue from '../../assets/EllipsisBlue.png';
import Car from '../../assets/Car.png';

import Input from '../../components/Input';
import CustomButton from '../../components/Button';

import Api from '../../Api.js';

export default () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [plateField, setPlateField] = useState('');
    const [userPlates, setUserPlates] = useState([]);
    const [token, setToken] = useState(null);

    const carIcon = { type: 'FontAwesome', name: 'car' };

    useEffect(() => {
        async function fetchUserPlates() {
            const userID = await getTokenFromStorage();
            if (userID) {
                const plates = await Api.getPlate(userID, token);
                setUserPlates(plates);
            }
        }

        fetchUserPlates();
    }, [token]);


    const handleAddPlateText = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
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

    const HandleAddPlate = async () => {
        const userID = await getTokenFromStorage();

        if (plateField !== '' && userID) {
            try {
                let res = await Api.addPlate(plateField, userID, token); 
                console.log('Response from addPlate:', res);
                setUserPlates(prevPlates => {
                    if (!Array.isArray(prevPlates)) {
                        return [{ plate: plateField }];
                    }
                    return [{ plate: plateField }, ...prevPlates];
                });
                alert('Placa cadastrada com sucesso!');
                setModalVisible(false);
            } catch (error) {
                console.error('Error adding plate:', error);
            }
        }
    };  

    return (
        <Container>
            <SquareBlue />
            <ImageEllipsis source={EllipsisBlue} />
            <AddPlateContainer>
                <ImageCar source={Car} />
                <TouchableOpacity onPress={handleAddPlateText}>
                    <AddPlateText>
                        {userPlates.length === 0
                            ? 'CADASTRAR'
                            : `${userPlates[0]?.plate || ''}`}
                    </AddPlateText>
                </TouchableOpacity>
            </AddPlateContainer>
            <CustomTextTimeContainer marginTop="7%">
                <CustomTextTime fontSize="23px" color="#ffffff">Saldo disponível</CustomTextTime>
                <CustomTextTime fontSize="28px" color="#ffffff">R$ 0,00</CustomTextTime>
            </CustomTextTimeContainer>
            <Modal isVisible={isModalVisible} style={{ justifyContent: 'center', alignItems: 'center', height: 10 }}>
                <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.7)" barStyle="white" />
                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', width: 300, height: 300, borderRadius: 20 }}>
                    <TouchableOpacity style={{ position: 'absolute', top: -20, right: -20, zIndex: 1 }} onPress={closeModal}>
                        <View style={{ width: 40, height: 40, backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="times" size={20} color="white" />
                        </View>
                    </TouchableOpacity>
                    <View style={{ padding: 20 }}>
                    <InputArea>
                        <Input
                            placeholder="Digite a Placa"
                            icon={carIcon}
                            value={plateField}
                            onChangeText={setPlateField}
                            password={false}
                            fontSize="20px"
                        />
                        <CustomButton
                            color="#1AD61A"
                            width="200px"
                            height="35%"
                            fontSize="25px" 
                            textColor="#ffffff"
                            text="Cadastrar"
                            borderRadius="50px"
                            marginTop="10%"
                            onPress={HandleAddPlate}
                        />
                    </InputArea>
                    </View>
                </View>
            </Modal>
            <View style={{ flex: 1 }}>
                <MapView 
                    provider={PROVIDER_GOOGLE} 
                    style={{width: 400, height: 600, marginTop: -15}}
                />
            </View>
        </Container>
    )
}