import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './app/screens/HomeScreen';
import {LoginScreen} from "@/app/screens/LoginPage/LoginScreen";
import {I18nProvider} from "@/i18n/I18nContext";

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
    return (
        <Stack.Navigator initialRouteName="Login">
            {/*<Stack.Screen name="Home" component={HomeScreen}/>*/}
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
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
