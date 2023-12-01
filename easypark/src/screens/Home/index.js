import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

import EllipsisBlue from '../../assets/EllipsisBlue.png';
import Car from '../../assets/Car.png';

import { Container, ImageEllipsis, SquareBlue, CustomTextTime, CustomTextTimeContainer, AddPlateContainer, AddPlateText, ImageCar, InputArea } from './styles';
import Input from '../../components/Input';
import CustomButton from '../../components/Button';
import Api from '../../Api.js';


export default () => {
    // Modal state
    const [isModalVisible, setModalVisible] = useState(false);
    const [isTokenModalVisible, setTokenModalVisible] = useState(false);

    // Plate-related state
    const [plateField, setPlateField] = useState('');
    const [userPlates, setUserPlates] = useState([]);

    // Token and authentication state
    const [token, setToken] = useState(null);

    // Account balance and time-related state
    const [accountBalance, setAccountBalance] = useState(0);
    const [convertedTime, setConvertedTime] = useState('00:00');
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    // Token field state
    const [tokenField, setTokenField] = useState('');

    const carIcon = { type: 'FontAwesome', name: 'car' };

    useEffect(() => {
        async function fetchData() {
            const userID = await getTokenFromStorage();
            if (userID) {
                const plates = await Api.getPlate(userID, token);
                setUserPlates(plates);
            }
        }
        
        fetchData();
    }, [token, setUserPlates]);

    const handleAddPlateText = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleTokenModal = () => {
        setTokenModalVisible(true);
    };

    const closeTokenModal = () => {
        setTokenModalVisible(false);
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
                setUserPlates((prevPlates) => {
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

    const fetchAccountBalance = async (userToken) => {
        try {
            const userID = await getTokenFromStorage();
    
            if (userID) {
                let res = await Api.getUserByID(userID, userToken);
    
                const formattedBalance = parseFloat(res.account_balance).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });
    
                // Verifica se houve mudança no saldo antes de atualizar o estado
                if (formattedBalance !== accountBalance) {
                    setAccountBalance(formattedBalance);
                }
            }
        } catch (error) {
            console.error('Error fetching account balance:', error);
        }
    };
    
    useEffect(() => {
        // Chama a função fetchAccountBalance a cada segundo
        const intervalId = setInterval(() => {
            fetchAccountBalance(token);
        }, 1000);
    
        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(intervalId);
    }, [token, accountBalance]);

    const convertBalanceToTime = (balance) => { //0,0416666666666667 minuto
        const numericBalance = parseFloat(balance.toString().replace(',', '.'));
        const exchangeRate = 1 / 1440;
        const exactSeconds = numericBalance / exchangeRate;
        const hours = Math.floor(exactSeconds / 3600);
        const minutes = Math.floor((exactSeconds % 3600) / 60);
        const remainingSeconds = Math.floor(exactSeconds % 60);
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        setConvertedTime(formattedTime);

    };

    useEffect(() => {
        if (accountBalance !== null && accountBalance !== undefined) {
            convertBalanceToTime(parseFloat(accountBalance.toString().replace(',', '.')));
        }
    }, [parseFloat(accountBalance.toString().replace(',', '.'))]);

    const handleStopTimer = async () => {

        const userID = await getTokenFromStorage();
        
        const spaces = await Api.getParkSpaces(token);
        const targetSpace = spaces.find(space => space.token === tokenField);
        
        if (targetSpace && targetSpace.status === 'occupied') {
            await Api.updateParkSpaceByID(targetSpace.id, 'free', token);
        }
        
        clearInterval(intervalId);
        setIsTimerActive(false);
        setIntervalId(null);

        const remainingSeconds = convertedTimeToSeconds(convertedTime);
        let secondsToMinutes = remainingSeconds / 60;

        let account_balance = secondsToMinutes * 0.0416666666666667;

        await Api.updateAccountBalanceUserByID(userID, account_balance, token);

    };

    const handleActiveTime = async () => {

        const spaces = await Api.getParkSpaces(token);

        const tokenToCheck = tokenField;
        const targetSpace = spaces.find(space => space.token === tokenToCheck);

        if (!targetSpace) {
            alert('Token inválido');
            return;
        }

        if (targetSpace.status === 'free') {
            let tokenId = targetSpace.id;
            let status = 'occupied';
            let res = await Api.updateParkSpaceByID(tokenId, status, token);
    
        } else {
            alert('A vaga já está ocupada!');
            return;
        }

        let totalSeconds = convertedTimeToSeconds(convertedTime);

        if (totalSeconds > 0 && !isTimerActive) {
            setIsTimerActive(true);

            const id = setInterval(() => {
                totalSeconds = totalSeconds - 1;

                const updatedTime = secondsToFormattedTime(totalSeconds);
                setConvertedTime(updatedTime);

                if (totalSeconds === 0) {
                    clearInterval(id);
                    setIsTimerActive(false);
                }
            }, 1000);

            setIntervalId(id);
        }

        setTokenModalVisible(false);
    };

    const convertedTimeToSeconds = (time) => {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    };

    const secondsToFormattedTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        let intervalId;

        const startTimer = () => {
            intervalId = setInterval(() => {
            }, 1000);
        };

        startTimer();

        return () => {
            clearInterval(intervalId);
        };
    }, []);

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
                color={isTimerActive ? "#FF0000" : "#1AD61A"}
                width="60%"
                height="9%"
                fontSize="30px" 
                textColor="#ffffff" 
                text={isTimerActive ? "DESATIVAR" : "ATIVAR"}
                marginTop="40%"
                borderRadius="50px"
                onPress={isTimerActive ? handleStopTimer : handleTokenModal}
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
            <Modal isVisible={isTokenModalVisible} style={{ justifyContent: 'center', alignItems: 'center', height: 10 }}>
                <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.7)" barStyle="white" />
                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', width: 300, height: 300, borderRadius: 20 }}>
                    <TouchableOpacity style={{ position: 'absolute', top: -20, right: -20, zIndex: 1 }} onPress={closeTokenModal}>
                        <View style={{ width: 40, height: 40, backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="times" size={20} color="white" />
                        </View>
                    </TouchableOpacity>
                    <View style={{ padding: 20 }}>
                    <InputArea>
                        <Input
                            placeholder="Digite o token da vaga"
                            icon={carIcon}
                            value={tokenField}
                            onChangeText={setTokenField}
                            fontSize="20px"
                        />
                        <CustomButton
                            color="#1AD61A"
                            width="200px"
                            height="35%"
                            fontSize="25px" 
                            textColor="#ffffff"
                            text="ATIVAR"
                            borderRadius="50px"
                            marginTop="10%"
                            onPress={handleActiveTime}
                        />
                    </InputArea>
                    </View>
                </View>
            </Modal>
        </Container>
    )
}