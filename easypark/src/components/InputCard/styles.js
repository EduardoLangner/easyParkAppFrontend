import styled from 'styled-components/native'

import { TextInputMask } from 'react-native-masked-text'

export const Container = styled.View`
    width: ${({ width }) => width || '90%'};
    height: 60px;
    padding: 8px;
    margin-top: 14px;
    background-color: #BDBDBD50;
    border-radius: 8px;
    flex-direction: row;
    align-items: center;
`

export const TextInput = styled.TextInput`
    margin-left: 4px;
    font-weight: bold;
    width: 100%;
`

export const MaskTextInput = styled(TextInputMask)`
    margin-left: 4px;
    font-weight: bold;
    width: 100%;
`