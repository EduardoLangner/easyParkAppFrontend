import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Preload from '../screens/Preload'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import Home from '../screens/Home'
import User from '../screens/User'
import Vehicles from '../screens/Vehicles'
import Answers from '../screens/Answers'
import MainTab from '../MainTab'

const Stack = createStackNavigator()

export default () => {
    return (
        <Stack.Navigator
            initialRouteName="Preload"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Preload" component={Preload} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="MainTab" component={MainTab} />
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="Vehicles" component={Vehicles} />
            <Stack.Screen name="Answers" component={Answers} />

        </Stack.Navigator>
    )
}