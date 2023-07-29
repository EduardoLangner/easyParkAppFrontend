import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'react-native'; 

import { Container, InputArea, ButtonForgetPassword, ButtonForgetPasswordText, SignInButtonSignUp, SignInButtonSignUpText, ImageSignupShort, ImageLogo, SocialLogosContainer, LoginText, ImageEllipsis, GoogleLogo, FacebookLogo, TwitterLogo} from './styles'

import SignUpShort from '../../assets/SignUpShort.png'
import Logo from '../../assets/LogoBlack.png'
import Ellipsis from '../../assets/Ellipsis.png'
import Google from '../../assets/GoogleLogo.png'
import Facebook from '../../assets/FacebookLogo.png'
import Twitter from '../../assets/TwitterLogo.png'

import Input from '../../components/Input'
import CustomButton  from '../../components/Button'

export default() => {

    const navigation = useNavigation()  

    const [emailField, setEmailField] = useState('')
    const [passwordField, setPasswordField] = useState('')

    handleSignInButtonSignUpClick = () => {
        navigation.reset({
            routes: [{name: 'SignUp'}]
        })
    }

    handleCustomButtonLoginClick = () => {
    }

    handleButtonForgetPasswordClick = () => {
    }

    const emailIcon = { type: 'Feather', name: 'mail' };
    const passwordIcon = { type: 'Feather', name: 'lock' };

    return (
        <Container>
            <StatusBar translucent backgroundColor="transparent" barStyle="white" />
            <ImageSignupShort source={SignUpShort} />
            <SignInButtonSignUp onPress={handleSignInButtonSignUpClick}>
                <SignInButtonSignUpText fontSize="18px" textColor="#000000">&nbsp;Or</SignInButtonSignUpText>
                <SignInButtonSignUpText fontSize="22px" textColor="#ffffff">&nbsp;&nbsp;Signup</SignInButtonSignUpText>
            </SignInButtonSignUp>
            <ImageEllipsis source={Ellipsis}/>
            <LoginText>Login</LoginText>
            <ImageLogo source={Logo} />
            <InputArea>
                <Input
                    placeholder="E-mail"
                    icon={emailIcon}
                    value={emailField}
                    onChangeText={setEmailField}
                    password={false}
                />
                <Input
                    placeholder="Senha"
                    icon={passwordIcon}
                    value={passwordField}
                    onChangeText={setPasswordField}
                    password={true}
                />
                <CustomButton
                    color="#6B92A4"
                    width="100%"
                    height="18%"
                    fontSize="24px"
                    textColor="#FFFFFF"
                    text="Entrar"
                    marginTop="10%"
                    marginBottom="20%"
                />
            </InputArea>
            <SocialLogosContainer>
                <GoogleLogo source={Google}/>
                <FacebookLogo source={Facebook}/>
                <TwitterLogo source={Twitter}/>
            </SocialLogosContainer>
            <ButtonForgetPassword onPress={handleButtonForgetPasswordClick}>
                <ButtonForgetPasswordText>Esqueci minha senha</ButtonForgetPasswordText>
            </ButtonForgetPassword>
        </Container>
    )
}