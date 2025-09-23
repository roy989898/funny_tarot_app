import React from 'react';
import {Button, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import {SafeAreaView} from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props): React.JSX.Element {

    const width = useSharedValue(0);
    const handlePress = () => {
        width.value = withSpring(width.value + 10);
    };
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Animated.View
                    style={{
                        width,
                        height: 100,
                        backgroundColor: 'violet',
                    }}
                />
                <Button onPress={handlePress} title="Click me"/>
            </View>
        </SafeAreaView>

    );

}
