import React from 'react';
import { ButtonContainer, ButtonText } from './styles'

const Button = ({ color, width, height, fontSize, textColor, text, marginTop, marginBottom, borderRadius, onPress }) => {
    return (
        <ButtonContainer
            color={color}
            width={width}
            height={height}
            marginTop={marginTop}
            marginBottom={marginBottom}
            borderRadius={borderRadius}
            onPress={onPress}
        >
            <ButtonText textColor={textColor} fontSize={fontSize}>
                {text}
            </ButtonText>
        </ButtonContainer>
    );
};

export default Button;
