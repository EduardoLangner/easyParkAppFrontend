import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/home';
import { Map } from '../screens/map';
import { Payment } from '../screens/payment';
import { Others } from '../screens/others';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export function Routes() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0 },
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#000',
                tabBarInactiveBackgroundColor: '#fff',
                tabBarActiveBackgroundColor: '#6B92A4',
            }}
        >
            <Tab.Screen name="Ativar" component={Home} 
                options={{
                    tabBarIcon: ({ focused, size, color }) => {
                        return <Ionicons name="play" size={size} color={color} />
                    },
                }}
            />
            <Tab.Screen name="Recarregar" component={Payment}
                options={{
                    tabBarIcon: ({ focused, size, color }) => {
                        return <Ionicons name="ios-card" size={size} color={color} />
                    },
                }}
            />
            <Tab.Screen name="Vagas" component={Map}
                options={{
                    tabBarIcon: ({ focused, size, color }) => {
                        return <FontAwesome5 name="map-marked-alt" size={size} color={color} />
                    },
                }}
            />
            <Tab.Screen name="Outros" component={Others} 
                options={{ 
                    tabBarIcon: ({ focused, size, color }) => {
                        return <MaterialCommunityIcons name="dots-horizontal-circle" size={size} color={color} />
                    },
                }}
            />
        </Tab.Navigator>
    );
}
