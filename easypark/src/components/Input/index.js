import React from 'react'
import { InputArea, Input, IconContainer } from './styles'
import { Feather, FontAwesome } from 'react-native-vector-icons'

export default ({ placeholder, icon, value, onChangeText, password, width, heigth }) => {
  const renderIcon = () => {
    const { type, name, size } = icon

    switch (type) {
      case 'Feather':
        return <Feather name={name} size={size || 18} color='#000000' />
      case 'FontAwesome':
        return <FontAwesome name={name} size={size || 18} color='#000000' />
      default:
        return null
    }
  }

  return (
    <InputArea>
      <IconContainer>{renderIcon()}</IconContainer>
      <Input
        placeholder={placeholder}
        placeholderTextColor='#000000'
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={password}
      />
    </InputArea>
  )
}
