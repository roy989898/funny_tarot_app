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

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Empty: undefined;
};
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator<RootStackParamList>();


function HomeStack() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={EmptyScreen}/>
            <Tab.Screen name="Feed" component={EmptyScreen}/>
            <Tab.Screen name="Notifications" component={EmptyScreen}/>
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
