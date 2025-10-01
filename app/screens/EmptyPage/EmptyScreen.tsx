import React from "react";
import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import type {RootStackParamList} from "@/App";
import {Button, View} from "react-native";
import Animated from "react-native-reanimated";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text} from "react-native-paper";

type Props = NativeStackScreenProps<RootStackParamList, 'Empty'>;

export default function EmptyScreen({navigation}: Props): React.JSX.Element {


    return (

        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, alignItems: 'center'}}>

                <Text>


                    Empty Screen

                </Text>
            </View>
        </SafeAreaView>


    )
}
