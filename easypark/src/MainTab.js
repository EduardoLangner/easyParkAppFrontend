import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, FontAwesome, FontAwesome5, Ionicons } from 'react-native-vector-icons';
import { View, StatusBar } from 'react-native';

import Home from './screens/Home';
import Payment from './screens/Payment';
import Maps from './screens/Maps';
import Others from './screens/Others';

const Tab = createBottomTabNavigator();

export default () => {
    const iconSizeplay = 29; 
    const iconSizeCard = 19;
    const iconSizeMap = 19;
    const iconSizeOthers = 24;

    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor="transparent"/>
            <Tab.Navigator screenOptions={{
                tabBarActiveTintColor: '#ffffff',
                tabBarInactiveTintColor: '#000000',
                tabBarActiveBackgroundColor: '#6B92A4',
                tabBarInactiveBackgroundColor: '#ffffff', 
                tabBarStyle: {
                    justifyContent: 'center', 
                    height: 60
                },
                tabBarLabelStyle: {
                    marginBottom: 4,
                    fontSize: 12,
                },
            }}>
                <Tab.Screen name="Ativar" component={Home} options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Entypo name="controller-play" color={color} size={iconSizeplay} style={{ marginBottom: -5 }} />
                    ),
                }} />
                <Tab.Screen name="Recarregar" component={Payment} options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="credit-card-alt" color={color} size={iconSizeCard} style={{ marginBottom: -5 }}/>
                    ),
                }} />
                <Tab.Screen name="Vagas" component={Maps} options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="map-marked-alt" color={color} size={iconSizeMap} style={{ marginBottom: -5 }}/>
                    ),
                }} />
                <Tab.Screen name="Outros" component={Others} options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="ellipsis-horizontal-circle-sharp" color={color} size={iconSizeOthers} style={{ marginBottom: -5 }}/>
                    ),
                }} />
            </Tab.Navigator>
        </View>
    );
};
