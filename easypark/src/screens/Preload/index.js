import React, { useEffect } from 'react'
import { Container, Image} from './styles'
import Logo from '../../assets/Logo.gif'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

export default () => {
    const navigation = useNavigation()

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token')
            if(token){

            }else{
                navigation.navigate('SignIn')
            }
        }
        checkToken()
    }, [])

    return (
        <Container>
            <Image source={Logo} />
        </Container>
    )
}
