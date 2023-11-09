    import React, { useState } from 'react'
    import { StatusBar } from 'react-native'; 
    import { useNavigation } from '@react-navigation/native'
    import { Container, ImageBackGround, ImageLogo, SignUpText, InputArea, ImageEllipsis, SignUpButtonSignIn, SignUpButtonSignInText, InputContainer  } from './styles'
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import jwtDecode from 'jwt-decode';

    import ImageBG from '../../assets/SignUpLong.png'
    import Logo from '../../assets/LogoWhite.png'
    import Ellipsis from '../../assets/Ellipsis.png'

    import CustomButton from '../../components/Button'
    import Input from '../../components/Input'

    import Api from '../../Api.js'

    export default () => {

        const navigation = useNavigation() 

        const UserIcon = { type: 'FontAwesome', name: 'user-o' }
        const CPFIcon = { type: 'FontAwesome', name: 'address-card-o' }
        const emailIcon = { type: 'FontAwesome', name: 'envelope-o' }
        const passwordIcon = { type: 'Feather', name: 'lock' }
        const confirmPasswordIcon = { type: 'Feather', name: 'lock' }

        const [nameField, setNameField] = useState('')
        const [cpfField, setCPFField] = useState('')
        const [emailField, setEmailField] = useState('')
        const [passwordField, setPasswordField] = useState('')
        const [confirmPasswordField, setConfirmPasswordField] = useState('')
        const [token, setToken] = useState(null);
        const handleSignUpButtonSignInClick = () => {
            navigation.reset({
                routes: [{name: 'SignIn'}]
            })
        }

        const handleSignUpClick = async () => {
            if (nameField !== '' && cpfField !== '' && emailField !== '' && passwordField !== '') {
                let res = await Api.signUp(nameField, cpfField, emailField, passwordField);
                if (res.token) {   
                    await AsyncStorage.setItem('token', res.token);
                    try {
                        const userID = await getTokenFromStorage();
                        if (userID) {
                            const user = await Api.getUserByID(userID, token);
                            if (user) {
                                const { name, cpf } = user;
                                const customer = await Api.createCustomer(name, cpf, token);
                                let asass_id = customer.id;
                                if(asass_id) {
                                    let user = await Api.updateUserByID(userID, asass_id, token);
                                    navigation.reset({
                                        routes: [{ name: 'Home' }]
                                    });
                                }
                            }
                        }
                    } catch (error) {
                        console.error('Erro ao criar o cliente no Asaas:', error);
                    }
                }
            } else {
                alert("Preencha todos os campos!");
            }
        }

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

        return (
            <Container>
                <StatusBar translucent backgroundColor="transparent" barStyle="white" />
                <ImageBackGround source={ImageBG} />
                <ImageLogo source={Logo} />
                <SignUpText>SignUp</SignUpText>
                <InputArea>
                    <InputContainer>
                        <Input 
                            placeholder="Nome Completo"
                            icon={UserIcon}
                            value={nameField}
                            onChangeText={setNameField}
                        />
                        <Input 
                            placeholder="CPF"
                            icon={CPFIcon}
                            value={cpfField}
                            onChangeText={setCPFField}
                        />
                        <Input 
                            placeholder="E-mail"
                            icon={emailIcon}
                            value={emailField}
                            onChangeText={setEmailField}
                        />
                        <Input 
                            placeholder="Senha"
                            icon={passwordIcon}
                            value={passwordField}
                            onChangeText={setPasswordField}
                            password={true}
                        />
                        <Input 
                            placeholder="Confirmar Senha"
                            icon={confirmPasswordIcon}
                            value={confirmPasswordField}
                            onChangeText={setConfirmPasswordField}
                            password={true}
                        />
                    </InputContainer>
                </InputArea>
                <CustomButton
                    color="rgba(107, 146, 164, 0.9)"
                    width="85%"
                    height="8%"
                    fontSize="24px" 
                    textColor="#FFFFFF"
                    text="Criar"
                    marginTop="8%"
                    marginBottom="10%"
                    onPress={handleSignUpClick}
                />
                <SignUpButtonSignIn onPress={handleSignUpButtonSignInClick}>
                    <SignUpButtonSignInText fontSize="18px" textColor="#9F9A9A">&nbsp;Or</SignUpButtonSignInText>
                    <SignUpButtonSignInText fontSize="22px" textColor="#000000">&nbsp;&nbsp;Login</SignUpButtonSignInText>
                </SignUpButtonSignIn>
                <ImageEllipsis source={Ellipsis}/>
            </Container>
        )
    }   