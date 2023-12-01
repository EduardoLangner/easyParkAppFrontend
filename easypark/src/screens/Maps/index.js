import React, { useState, useEffect } from 'react';
import { Container, ImageEllipsis, SquareBlue, CustomTextTime, CustomTextTimeContainer, AddPlateContainer, AddPlateText, ImageCar, InputArea } from './styles';
import { View, TouchableOpacity, StatusBar, Image } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import EllipsisBlue from '../../assets/EllipsisBlue.png';
import Car from '../../assets/Car.png';
import ParkingFree from '../../assets/ParkingFree.png';
import ParkingOccupied from '../../assets/ParkingOccupied.png';
import ParkingElderly from '../../assets/ParkingElderly.png';
import ParkingSpecial from '../../assets/ParkingSpecial.png';

import Input from '../../components/Input';
import CustomButton from '../../components/Button';

import Api from '../../Api.js';

export default () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [plateField, setPlateField] = useState('');
    const [userPlates, setUserPlates] = useState([]);
    const [token, setToken] = useState(null);
    const [accountBalance, setAccountBalance] = useState(0);
    const [parkingSpaces, setParkingSpaces] = useState([]);
    const [initialRegion, setInitialRegion] = useState(null);

    const carIcon = { type: 'FontAwesome', name: 'car' };

    useEffect(() => {
        async function fetchParkingSpaces() {
            try {
                const spaces = await Api.getParkSpaces(token);
                setParkingSpaces(spaces);

                const hasStatusChanged = spaces.some((space, index) => {
                    return space.status !== parkingSpaces[index]?.status;
                });

                if (spaces.length > 0) {
                    const firstSpace = spaces[0];
                    setInitialRegion({
                        latitude: parseFloat(firstSpace.latitude),
                        longitude: parseFloat(firstSpace.longitude),
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });
                }
            } catch (error) {
                console.error('Error fetching parking spaces:', error);
            }
        }

        fetchParkingSpaces();
    }, [token, parkingSpaces]);

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

    const position = [51.505, -0.09]

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
                    initialRegion={initialRegion} 
                >
                    {parkingSpaces.map(space => (
                        <Marker
                            key={space.id}
                            coordinate={{
                                latitude: parseFloat(space.latitude),
                                longitude: parseFloat(space.longitude),
                            }}
                            title={`Vaga ${space.id}`}
                            description={`Tipo: ${space.type}, Status: ${space.status}, Token: ${space.token}`}
                        >
                            <Image
                                source={
                                    space.status === 'free'
                                        ? ParkingFree
                                        : space.status === 'occupied'
                                        ? ParkingOccupied
                                        : space.type === 'Elderly'
                                        ? ParkingElderly
                                        : ParkingSpecial
                                }
                                style={{ width: 30, height: 30 }}
                            />
                        </Marker>
                    ))}
                </MapView>
            </View>
        </Container>
    )
}