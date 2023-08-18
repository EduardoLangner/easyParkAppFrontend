import React, { useEffect } from 'react'
import { Container, Image} from './styles'
import Logo from '../../assets/Logo.gif'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import jwtDecode from 'jwt-decode';

import Api from '../../Api'

export default () => {
    const navigation = useNavigation()

useEffect(() => {
    
    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            try {
                const tokenData = jwtDecode(token);
                const expirationTime = tokenData.exp * 1000;
                const currentTime = Date.now();

                if (currentTime < expirationTime) {
                    console.log('Token válido:', tokenData);
                    navigation.navigate('MainTab');
                } else {
                    console.log('Token expirado');
                    navigation.navigate('SignIn');
                }
            } catch (error) {
                console.log('Erro ao decodificar o token:', error);
                navigation.navigate('SignIn');
            }
        } else {
            navigation.navigate('SignIn');
        }
    }

    checkToken();
}, []);

    

    return (
        <Container>
            <Image source={Logo} />
        </Container>
    )
}
