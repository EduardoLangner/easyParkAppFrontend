import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../screens/Home'
import Payment from '../screens/Payment'
import Maps from '../screens/Maps'
import Others from '../screens/Others'

const Tab = createBottomTabNavigator()

export default () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Payment" component={Payment} />
            <Tab.Screen name="Maps" component={Maps} />
            <Tab.Screen name="Others" component={Others} />
        </Tab.Navigator>
    )
}