import {Text, useTheme} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";
import {View} from "react-native";
import React from "react";

export default function ChatScreen() {


    const theme = useTheme();


    return (

        <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
            <View style={{flex: 1, alignItems: 'center'}}>

                <Text>


                    Chat Screen

                </Text>
            </View>
        </SafeAreaView>


    )
}
