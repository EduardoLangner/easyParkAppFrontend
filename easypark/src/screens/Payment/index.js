import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, StatusBar, Animated  } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import { 
    Container, 
    ImageEllipsis, 
    SquareBlue, 
    CustomText, 
    CustomTextContainer, 
    AddPlateContainer, 
    AddPlateText, 
    ImageCar, 
    InputArea, 
    InformationTexT, 
} from './styles';

import jwtDecode from 'jwt-decode';

import EllipsisBlue from '../../assets/EllipsisBlue.png';
import Car from '../../assets/Car.png';
import Input from '../../components/Input';
import Card from '../../components/Card';
import InputCard from '../../components/InputCard';
import CustomButton from '../../components/Button';
import Api from '../../Api.js';
import { getBrand } from '../../components/InputCard/brand';

import Carousel from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';

export default () => {
    const [isModalPlateVisible, setModalPlateVisible] = useState(false);
    const [plateField, setPlateField] = useState('');
    const [userPlates, setUserPlates] = useState([]);
    const [token, setToken] = useState(null);
    const [isModalCardVisible, setModalCardVisible] = useState(false);
    const [card, setCard] = useState({
        name: '',
        number: '',
        validate: '',
        cvv: ''
    });
    // const [flag, setFlag] = useState({
    //     flag: false
    // })
    const [widthAnimated, setWidthAnimated] = useState(new Animated.Value(310));
    const [backView, setBackView] = useState(false);
    const [nameCreditCardField, setNameCreditCardField] = useState('');
    const [numberCreditCardField, setNumberCreditCardField] = useState('');
    const [validateCreditCardField, setValidateCreditCardField] = useState('');
    const [cvvCreditCardField, setCvvCreditCardField] = useState('');
    const [creditCards, setCreditCards] = useState([]);

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

    const openModalPlate = () => {
        setModalPlateVisible(true);
    };

    const closeModalPlate = () => {
        setModalPlateVisible(false);
    };

    const openModalCard = () => {
        setModalCardVisible(true);
    };

    const closeModalCard = () => {
        setModalCardVisible(false);
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
                setModalPlateVisible(false);
            } catch (error) {
                console.error('Error adding plate:', error);
            }
        }
    };  

    const data = [
        { id: 1, color: '#1AD61A', text: 'R$ 5,00', info: '2 horas' },
        { id: 2, color: '#1AD61A', text: 'R$ 6,25', info: '2 h 30 min.' },
        { id: 3, color: '#1AD61A', text: 'R$ 7,50', info: '3 horas' },
        { id: 4, color: '#1AD61A', text: 'R$ 8,75', info: '3 h 30 min.' },
        { id: 5, color: '#1AD61A', text: 'R$ 10,00', info: '4 horas' },
        { id: 6, color: '#1AD61A', text: 'R$ 20,00', info: '8 horas' }
    ];

    const renderItem = ({ item }) => (
        <View style={[styles.item, { backgroundColor: item.color, justifyContent: 'center' }]}>
            <Text style={{ color: '#ffffff', textAlign: 'center', textAlignVertical: 'center', fontSize: 22, marginTop: 30, height: 50 }}>
                {item.text}
            </Text>
            <Text style={{ color: '#000000', textAlign: 'center', textAlignVertical: 'center', fontSize: 17, marginTop: 10, fontWeight: 'bold' }}>
                {item.info}
            </Text>
        </View>
    );

    const animatedCard = (back) => {
        if(back && !backView){
            Animated.timing(widthAnimated, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false
            }).start()
            
            setTimeout(() => {
                Animated.timing(widthAnimated, {
                    toValue: 310,
                    duration: 400,
                    useNativeDriver: false
                }).start()
                setBackView(true)
            }, 400)
        } else if(!back && backView){
            Animated.timing(widthAnimated, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false
            }).start()
            
            setTimeout(() => {
                Animated.timing(widthAnimated, {
                    toValue: 310,
                    duration: 400,
                    useNativeDriver: false
                }).start()
                setBackView(false)
            }, 400)
        }
    }

    const HandleAddCreditCard = async () => {

        const userID = await getTokenFromStorage();

        if (nameCreditCardField !== '' && numberCreditCardField !== '' && validateCreditCardField !== '' && cvvCreditCardField !== '' && userID) {
            try {
                let res = await Api.addCreditCard(nameCreditCardField, numberCreditCardField, validateCreditCardField, cvvCreditCardField, userID, token);
                console.log(res)
                alert('Cartão cadastrado com sucesso!');
                setModalCardVisible(false);
            } catch (error) {
                console.error('Error adding credit card:', error);
            }
        }
    }; 

    return (
        <Container>
            <SquareBlue />
            <ImageEllipsis source={EllipsisBlue} />
            <AddPlateContainer>
                <ImageCar source={Car} />
                <TouchableOpacity onPress={openModalPlate}>
                    <AddPlateText>
                        {userPlates.length === 0
                            ? 'CADASTRAR'
                            : `${userPlates[0]?.plate || ''}`}
                    </AddPlateText>
                </TouchableOpacity>
            </AddPlateContainer>
            <CustomTextContainer marginTop="3%">
                <CustomText fontSize="22px" color="#ffffff">R$ 0,00</CustomText>
            </CustomTextContainer>
            <Modal isVisible={isModalPlateVisible} style={{ justifyContent: 'center', alignItems: 'center', height: 300 }}>
                <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.7)" barStyle="white" />
                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', width: 300, height: 300, borderRadius: 20 }}>
                    <TouchableOpacity style={{ position: 'absolute', top: -20, right: -20, zIndex: 1 }} onPress={closeModalPlate}>
                        <View style={{ width: 40, height: 40, backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="times" size={20} color="white" />
                        </View>
                    </TouchableOpacity>
                    <View style={{ padding: 20 }}>
                        <InputArea>
                            <Input
                                placeholder="Digite a Placa"
                                flag={carIcon}
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
            <InformationTexT>Tempo mínimo para recarga de {'\n'} 2 horas!</InformationTexT>
            <View style={{ flex: 1 }}>
                <Carousel
                    data={data}
                    renderItem={renderItem}
                    sliderWidth={380}
                    itemWidth={120}
                    initialScrollIndex={3}
                />
               
                <LinearGradient
                    colors={['rgba(103,150,171,0.6)','rgba(1,32,47,0.8)']} 
                    style={{ ...styles.linearGradient, height: 230, position: 'absolute', top: 140, left: 0, right: 0 }}
                >
                    <Text onPress={openModalCard}>teste</Text>
                    {creditCards.map((card, index) => (
                    <View key={index}>
                        <Text>{card.name}</Text>
                        <Text>{card.number}</Text>
                        <Text>{card.date}</Text>
                        <Text>{card.cvv}</Text>
                    </View>
                    ))}
                </LinearGradient>
            </View>
            <Modal isVisible={isModalCardVisible} style={{position: "absolute"}}>
                <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.7)" barStyle="white" />
                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff',
                    width: 350, height: 500, borderRadius: 20,}}>
                    <TouchableOpacity style={{ position: 'absolute', top: -20, right: -20, zIndex: 1 }} onPress={closeModalCard}>
                        <View style={{ width: 40, height: 40, backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="times" size={20} color="white" />
                        </View>
                    </TouchableOpacity>
                    <Animated.View style={{width: widthAnimated}}>
                        <Card card={card} back={backView} /*flag={flag}*//>
                    </Animated.View>
                    <InputCard 
                        placeholder="Nome do Titular"
                        flag={<MaterialCommunityIcons name="account-outline" size={20} color="#6B92A4" style={{ marginRight: 10 }} />}
                        value={card.name}
                        onChangeText={(text) => {
                            setCard({ ...card, name: text })
                            setNameCreditCardField(text)
                        }}
                    />
                    <InputCard
                        placeholder="Número do Cartão"
                        flag={<MaterialCommunityIcons name="numeric" size={20} color="#6B92A4" style={{ marginRight: 10 }} />}
                        value={card.number}
                        onChangeText={(text) => {
                            setCard({ ...card, number: text })
                            // setFlag(getBrand(text))
                            animatedCard(false)
                            setNumberCreditCardField(text)
                        }}
                        type="credit-card"
                        mask
                    />
                    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                        <InputCard 
                            width="43%" 
                            placeholder="Validade"
                            flag={<MaterialCommunityIcons name="calendar-month-outline" size={20} color="#6B92A4" style={{ marginRight: 10 }} />}
                            value={card.validate}
                            onChangeText={(text) => {
                                setCard({ ...card, validate: text })
                                animatedCard(false)
                                setValidateCreditCardField(text)                            }}
                            type="custom"
                            options={{
                                mask: '99/99'
                            }}
                            mask
                        />
                        <View width="4%" />
                        <InputCard 
                            width="43%" 
                            placeholder="CVV"
                            flag={<MaterialCommunityIcons name="lock-outline" size={20} color="#6B92A4" style={{ marginRight: 10 }} />}
                            value={card.cvv}
                            onChangeText={(text) => {
                                setCard({ ...card, cvv: text })
                                animatedCard(true)
                                setCvvCreditCardField(text)
                            }}
                            type="custom"
                            options={{
                                mask: '999'
                            }}
                            mask
                        />
                    </View>
                    <CustomButton
                        color="#1AD61A"
                        width="200px"
                        height="60px" 
                        fontSize="25px" 
                        textColor="#ffffff"
                        text="Cadastrar"
                        borderRadius="50px"
                        marginTop="15px"
                        onPress={HandleAddCreditCard}
                    />
                </View>
            </Modal>
            <CustomButton
                color="#1AD61A"
                width="200px"
                height="60px" 
                fontSize="25px" 
                textColor="#ffffff"
                text="Finalizar"
                borderRadius="50px"
                marginBottom="20px"
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    item: {
        height: 50,
        marginLeft: 10,
        marginTop: 20,
        borderRadius: 10
    },
    linearGradient: {
        borderRadius: 10,
        width: 380,
    },
});