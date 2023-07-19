import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/stacks/MainStack'
import 'react-native-gesture-handler'

export default function App() {
    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    )
}