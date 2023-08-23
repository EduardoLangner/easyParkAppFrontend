import React, { useState } from 'react'
import { Container, ImageEllipsis, SquareBlue, CustomTextTime, CustomTextTimeContainer, AddPlateContainer, AddPlateText, ImageCar} from './styles'

import Modal from 'react-native-modal'


import EllipsisBlue from '../../assets/EllipsisBlue.png'
import Car from '../../assets/Car.png'

import CustomButton  from '../../components/Button'

export default () => {

    const [isModalVisible, setModalVisible] = useState(false)

    const handleAddPlateText = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <Container>
            <SquareBlue/>
            <ImageEllipsis source={EllipsisBlue}/>
            <AddPlateContainer>
                <ImageCar source={Car}/>
                <AddPlateText onPress={handleAddPlateText}>CADASTRAR</AddPlateText>
                <Modal isVisible={isModalVisible}>
                {/* Conteúdo do seu modal */}
                {/* Inclua um botão para fechar o modal, vinculando à função closeModal */}
                </Modal>
            </AddPlateContainer>
            <CustomTextTimeContainer marginTop="7%">
                <CustomTextTime fontSize="23px" color="#ffffff">Saldo disponível</CustomTextTime>
                <CustomTextTime fontSize="28px" color="#ffffff">R$ 0,00</CustomTextTime>
            </CustomTextTimeContainer>
            <CustomButton
                color="#7CD07C"
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
                <CustomTextTime fontSize="34px">00:00</CustomTextTime>
            </CustomTextTimeContainer>
        </Container>
    )
}