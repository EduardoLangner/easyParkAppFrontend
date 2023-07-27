import React from 'react';
import { Container, InputArea, CustomButton, CustomButtonText, ButtonForgePassword, ButtonForgePasswordText, SignInButtonSignUp, SignInButtonSignUpText, ImageSignupShort, ImageLogo, SocialLogosContainer, LoginText, ImageEllipsis, GoogleLogo, FacebookLogo, TwitterLogo} from './styles';
import SignUpShort from '../../assets/SignUpShort.png';
import Logo from '../../assets/Logo.png';
import Ellipsis from '../../assets/Ellipsis.png';
import Google from '../../assets/GoogleLogo.png';
import Facebook from '../../assets/FacebookLogo.png';
import Twitter from '../../assets/TwitterLogo.png';
import SignUpInput from '../../components/SignUpInput';

const SignupForm = () => {
    return (
        <Container>
            <ImageSignupShort source={SignUpShort} />
            <SignInButtonSignUp>
                <SignInButtonSignUpText fontSize="18px" textColor="#000000">&nbsp;Or</SignInButtonSignUpText>
                <SignInButtonSignUpText fontSize="22px" textColor="#ffffff">&nbsp;&nbsp;Signup</SignInButtonSignUpText>
            </SignInButtonSignUp>
            <ImageEllipsis source={Ellipsis}/>
            <LoginText>Login</LoginText>
            <ImageLogo source={Logo} />
            <InputArea>
                <SignUpInput/>
                <SignUpInput/>
                <CustomButton>
                    <CustomButtonText>Entrar</CustomButtonText>
                </CustomButton>
            </InputArea>
            <SocialLogosContainer>
                <GoogleLogo source={Google} />
                <FacebookLogo source={Facebook} />
                <TwitterLogo source={Twitter} />
            </SocialLogosContainer>
            <ButtonForgePassword>
                <ButtonForgePasswordText>Esqueci minha senha</ButtonForgePasswordText>
            </ButtonForgePassword>
        </Container>
    )
}

export default SignupForm;