import React from 'react';
import styled from 'styled-components/native';

export const ButtonContainer = styled.TouchableOpacity`
    width: ${props => props.width || '100%'};
    height: ${props => props.height || '20%'};
    background-color: ${props => props.color || '#ffffff'};
    justify-content: center;
    align-items: center;
    border-radius: ${props => props.borderRadius || '12px'};
    margin-top: ${props => props.marginTop || '0%'};
    margin-bottom: ${props => props.marginBottom || '0%'};
`;

export const ButtonText = styled.Text`
    font-size: ${props => props.fontSize || '16px'};
    color: ${props => props.textColor || '#000000'};
    font-weight: bold;
`;