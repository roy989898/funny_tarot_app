import {Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import type {RootStackParamList} from "@/App";
import React from "react";

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({navigation}: Props): React.JSX.Element {


    return (
        <SafeAreaView style={{flex: 1}}>
            <View>

                <Text>LoginScreen</Text>
            </View>
        </SafeAreaView>


    )


}
