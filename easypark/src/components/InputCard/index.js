import react from 'react'

import { Container, TextInput, MaskTextInput } from './styles'

export default ({ width, icon, placeholder, value, onChangeText, mask, type, options }) => {
    return (
        <Container width={width}>
            {icon && icon}

            {mask
                ? <MaskTextInput value={value} type={type} options={options} onChangeText={(text) => onChangeText(text)} placeholder={placeholder} />
                : <TextInput value={value} onChangeText={(text) => onChangeText(text)} placeholder={placeholder} />
            }
        </Container>
    )
}