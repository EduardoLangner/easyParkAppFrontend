    import React, { useState } from 'react'
    import { StatusBar } from 'react-native'; 
    import { useNavigation } from '@react-navigation/native'
    import { Container, ImageBackGround, ImageLogo, SignUpText, InputArea, ImageEllipsis, SignUpButtonSignIn, SignUpButtonSignInText, InputContainer  } from './styles'

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

        const handleSignUpButtonSignInClick = () => {
            navigation.reset({
                routes: [{name: 'SignIn'}]
            })
        }

        const handleSignUpClick = async () => {
            if(nameField != '' && cpfField != '' && emailField != '' && passwordField != '') {
                let json = await Api.signUp(nameField, cpfField, emailField, passwordField)
                console.log(json)
                if(json.token) {
                    alert("Deu certo!")
                }else{
                    alert("Error: " + json.error)
                }
            }else{
                alert("Preencha todos os campos!")
            }
        }

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