import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './app/screens/HomeScreen';
import {LoginScreen} from "@/app/screens/LoginPage/LoginScreen";
import {I18nProvider} from "@/i18n/I18nContext";
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from '@expo/vector-icons/Ionicons';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import EmptyScreen from "@/app/screens/EmptyPage/EmptyScreen";
import {useTheme} from "react-native-paper";

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Empty: undefined;
};
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator<RootStackParamList>();


function HomeStack() {
    const theme = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'ios-list' : 'ios-list-outline';
                    }

                    // You can return any component that you like here!
                    // @ts-ignore
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.onSurfaceVariant,

                tabBarStyle: {
                    backgroundColor: theme.colors.surfaceVariant, // Change this to your desired color
                },

            })}


        >
            <Tab.Screen name="Chat" component={EmptyScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Feed" component={EmptyScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Notifications" component={EmptyScreen} options={{headerShown: false}}/>
        </Tab.Navigator>
    )

}

function RootStack() {
    return (
        <Stack.Navigator initialRouteName="Login">
            {/*<Stack.Screen name="Home" component={HomeScreen}/>*/}
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Home" component={HomeStack} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export default function App(): React.JSX.Element {
    return (
        <I18nProvider>
            <NavigationContainer>
                <RootStack/>
            </NavigationContainer>
        </I18nProvider>

    );
}
