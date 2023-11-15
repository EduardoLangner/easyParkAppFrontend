import React, { useState, useEffect } from 'react';
import { Container, ImageEllipsis, SquareBlue, CustomTextTime, CustomTextTimeContainer, AddPlateContainer, AddPlateText, ImageCar, InputArea } from './styles';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

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
    const [accountBalance, setAccountBalance] = useState(0);
    const [convertedTime, setConvertedTime] = useState('00:00');

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

    const HandleGetAccountBalance = async () => {
        const userID = await getTokenFromStorage();
        let res = await Api.getUserByID(userID, token);
        
        const formattedBalance = parseFloat(res.account_balance).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    
        setAccountBalance(formattedBalance);
    };

    useEffect(() => {
        HandleGetAccountBalance();
    }, [token]);

    const convertBalanceToTime = (balance) => {
    
        // Remove as vírgulas e converte para número
        const numericBalance = parseFloat(balance.toString().replace(',', '.'));
    
        // A taxa de câmbio entre reais e segundos é 1/1440
        const exchangeRate = 1 / 1440;
    
        // Calcula os segundos com base no valor exato em reais
        const exactSeconds = numericBalance / exchangeRate;
    
        // Converte os segundos em horas, minutos e segundos
        const hours = Math.floor(exactSeconds / 3600);
        const minutes = Math.floor((exactSeconds % 3600) / 60);
        const remainingSeconds = Math.floor(exactSeconds % 60);
    
        // Formata o resultado como 'HH:mm:ss'
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    
        // Atualiza o estado com o tempo convertido
        setConvertedTime(formattedTime);
    };
    
    useEffect(() => {
        // Quando o saldo da conta é atualizado, converte e atualiza o estado
        if (accountBalance !== null && accountBalance !== undefined) {
          convertBalanceToTime(parseFloat(accountBalance.toString().replace(',', '.')));
        }
    }, [parseFloat(accountBalance.toString().replace(',', '.'))]);
    

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
                <CustomTextTime fontSize="28px" color="#ffffff">R$ {accountBalance}</CustomTextTime>
            </CustomTextTimeContainer>
            <CustomButton
                color="#1AD61A"
                width="60%"
                height="9%"
                fontSize="30px" 
                textColor="#ffffff" 
                text="ATIVAR"
                marginTop="40%"
                borderRadius="50px"
            />
            <CustomTextTimeContainer>
                <CustomTextTime>Tempo:</CustomTextTime>
                <CustomTextTime fontSize="34px">{convertedTime}</CustomTextTime>
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
        </Container>
    )
}