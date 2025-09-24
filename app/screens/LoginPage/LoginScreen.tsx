import {View, StyleSheet, TouchableOpacity} from "react-native";
import {Text, TextInput, Button, useTheme} from 'react-native-paper'
import {Image} from 'expo-image';
import {SafeAreaView} from "react-native-safe-area-context";
import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import type {RootStackParamList} from "@/App";
import React, {useState, useEffect} from "react";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    interpolate, useDerivedValue,
} from 'react-native-reanimated';
// Array of all tarot cards
const TAROT_CARDS = [
    // Major Arcana
    require('../../../assets/images/major_arcana/tarot__fool.png'),
    require('../../../assets/images/major_arcana/tarot__magician.png'),
    require('../../../assets/images/major_arcana/tarot__priestess.png'),
    require('../../../assets/images/major_arcana/tarot__empress.png'),
    require('../../../assets/images/major_arcana/tarot__emperor.png'),
    require('../../../assets/images/major_arcana/tarot__hierophant.png'),
    require('../../../assets/images/major_arcana/tarot__lovers.png'),
    require('../../../assets/images/major_arcana/tarot__chariot.png'),
    require('../../../assets/images/major_arcana/tarot__strength.png'),
    require('../../../assets/images/major_arcana/tarot__hermit.png'),
    require('../../../assets/images/major_arcana/tarot__fortune.png'),
    require('../../../assets/images/major_arcana/tarot__justice.png'),
    require('../../../assets/images/major_arcana/tarot__hangman.png'),
    require('../../../assets/images/major_arcana/tarot__death.png'),
    require('../../../assets/images/major_arcana/tarot__temperance.png'),
    require('../../../assets/images/major_arcana/tarot__devil.png'),
    require('../../../assets/images/major_arcana/tarot__tower.png'),
    require('../../../assets/images/major_arcana/tarot__star.png'),
    require('../../../assets/images/major_arcana/tarot__moon.png'),
    require('../../../assets/images/major_arcana/tarot__sun.png'),
    require('../../../assets/images/major_arcana/tarot__judgment.png'),
    require('../../../assets/images/major_arcana/tarot__theworld.png'),

    // Minor Arcana - Cups
    require('../../../assets/images/minor_arcana/tarot__ace_cups.png'),
    require('../../../assets/images/minor_arcana/tarot__2_cups.png'),
    require('../../../assets/images/minor_arcana/tarot__3_cups.png'),
    require('../../../assets/images/minor_arcana/tarot__4_cups.png'),
    require('../../../assets/images/minor_arcana/tarot__5_cups.png'),
    require('../../../assets/images/minor_arcana/tarot__6_cups.png'),
    require('../../../assets/images/minor_arcana/tarot__7_cups.png'),
    require('../../../assets/images/minor_arcana/tarot__8_cups.png'),
    require('../../../assets/images/minor_arcana/tarot__9_cups.png'),
    require('../../../assets/images/minor_arcana/tarot__10_cups.png'),
    require('../../../assets/images/minor_arcana/tarot__page_cups.png'),
    require('../../../assets/images/minor_arcana/tarot__knight_cups.png'),
    require('../../../assets/images/minor_arcana/tarot__queen_cups.png'),
    require('../../../assets/images/minor_arcana/tarot__king_cups.png'),

    // Minor Arcana - Wands
    require('../../../assets/images/minor_arcana/tarot__ace_wands.png'),
    require('../../../assets/images/minor_arcana/tarot__2_wands.png'),
    require('../../../assets/images/minor_arcana/tarot__3_wands.png'),
    require('../../../assets/images/minor_arcana/tarot__4_wands.png'),
    require('../../../assets/images/minor_arcana/tarot__5_wands.png'),
    require('../../../assets/images/minor_arcana/tarot__6_wands.png'),
    require('../../../assets/images/minor_arcana/tarot__7_wands.png'),
    require('../../../assets/images/minor_arcana/tarot__8_wands.png'),
    require('../../../assets/images/minor_arcana/tarot__9_wands.png'),
    require('../../../assets/images/minor_arcana/tarot__10_wands.png'),
    require('../../../assets/images/minor_arcana/tarot__page_wands.png'),
    require('../../../assets/images/minor_arcana/tarot__knight_wands.png'),
    require('../../../assets/images/minor_arcana/tarot__queen_wands.png'),
    require('../../../assets/images/minor_arcana/tarot__king_wands.png'),

    // Minor Arcana - Swords
    require('../../../assets/images/minor_arcana/tarot__ace_swords.png'),
    require('../../../assets/images/minor_arcana/tarot__2_swords.png'),
    require('../../../assets/images/minor_arcana/tarot__3_swords.png'),
    require('../../../assets/images/minor_arcana/tarot__4_swords.png'),
    require('../../../assets/images/minor_arcana/tarot__5_swords.png'),
    require('../../../assets/images/minor_arcana/tarot__6_swords.png'),
    require('../../../assets/images/minor_arcana/tarot__7_swords.png'),
    require('../../../assets/images/minor_arcana/tarot__8_swords.png'),
    require('../../../assets/images/minor_arcana/tarot__9_swords.png'),
    require('../../../assets/images/minor_arcana/tarot__10_swords.png'),
    require('../../../assets/images/minor_arcana/tarot__page_swords.png'),
    require('../../../assets/images/minor_arcana/tarot__knight_swords.png'),
    require('../../../assets/images/minor_arcana/tarot__queen_swords.png'),
    require('../../../assets/images/minor_arcana/tarot__king_swords.png'),

    // Minor Arcana - Pentacles
    require('../../../assets/images/minor_arcana/tarot__ace_pentacles.png'),
    require('../../../assets/images/minor_arcana/tarot__2_pentacles.png'),
    require('../../../assets/images/minor_arcana/tarot__3_pentacles.png'),
    require('../../../assets/images/minor_arcana/tarot__4_pentacles.png'),
    require('../../../assets/images/minor_arcana/tarot__5_pentacles.png'),
    require('../../../assets/images/minor_arcana/tarot__6_pentacles.png'),
    require('../../../assets/images/minor_arcana/tarot__7_pentacles.png'),
    require('../../../assets/images/minor_arcana/tarot__8_pentacles.png'),
    require('../../../assets/images/minor_arcana/tarot__9_pentacles.png'),
    require('../../../assets/images/minor_arcana/tarot__10_pentacles.png'),
    require('../../../assets/images/minor_arcana/tarot__page_pentacles.png'),
    require('../../../assets/images/minor_arcana/tarot__knight_pentacles.png'),
    require('../../../assets/images/minor_arcana/tarot__queen_pentacles.png'),
    require('../../../assets/images/minor_arcana/tarot__king_pentacles.png'),
];

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({navigation}: Props): React.JSX.Element {
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Animation setup for spinning card
    const rotation = useSharedValue(0);
    // const isCardFace = useSharedValue(false);
    const [isCardFace, setIsCardFace] = useState(true);


    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(180 * 10, {duration: 1500 * 10}),
            -1,
            false
        );


    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {rotateY: `${rotation.value}deg`}
            ],
        };
    });

    return (
        <SafeAreaView style={{
            ...styles.container, backgroundColor: theme.colors.background
        }}>
            <View style={styles.content}>
                <View style={styles.header}>
                    {/*TODO here change to ICON or something*/}
                    <Animated.View style={animatedStyle}>
                        {/*         <Text style={styles.title}>{isCardFace.value}</Text>
                        <Text style={styles.title}>{rotation.value}</Text>*/}
                        <Image source={TAROT_CARDS[0]}
                               style={{width: 80, height: 120}}/>
                    </Animated.View>

                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Sign in to continue</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        {/*<Text style={styles.label}>Email</Text>*/}
                        <TextInput
                            label={"Email"}
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        {/*<Text style={styles.label}>Password</Text>*/}
                        <TextInput
                            label={"Password"}
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter your password"
                            secureTextEntry
                            autoComplete="password"
                        />
                    </View>

                    {/* <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>*/}
                    <Button mode="contained" onPress={() => console.log('Sign In')}>
                        Sign In
                    </Button>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don&#39;t have an account?</Text>
                    <TouchableOpacity>
                        <Text style={{color: theme.colors.primary, ...styles.footerLink}}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24, // 8pt × 3
        paddingTop: 48, // 8pt × 6
        paddingBottom: 32, // 8pt × 4
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
        marginBottom: 48, // 8pt × 6
    },
    title: {
        fontSize: 32, // 8pt × 4
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 8, // 8pt × 1
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16, // 8pt × 2
        color: '#6B7280',
        textAlign: 'center',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        gap: 24, // 8pt × 3
    },
    inputGroup: {
        gap: 8, // 8pt × 1
    },
    label: {
        fontSize: 16, // 8pt × 2
        fontWeight: '500',
        color: '#374151',
        marginBottom: 8, // 8pt × 1
    },
    input: {
        /*  height: 48, // 8pt × 6
          borderWidth: 1,
          borderColor: '#D1D5DB',
          borderRadius: 8, // 8pt × 1
          paddingHorizontal: 16, // 8pt × 2*/
        fontSize: 16, // 8pt × 2
        // backgroundColor: '#FFFFFF',
    },
    /*  button: {
          height: 48, // 8pt × 6
          backgroundColor: '#3B82F6',
          borderRadius: 8, // 8pt × 1
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 8, // 8pt × 1
      },*/
    buttonText: {
        fontSize: 16, // 8pt × 2
        // fontWeight: '600',
        // color: '#FFFFFF',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8, // 8pt × 1
        marginTop: 32, // 8pt × 4
    },
    footerText: {
        fontSize: 16, // 8pt × 2
        color: '#6B7280',
    },
    footerLink: {
        fontSize: 16, // 8pt × 2
        fontWeight: '600',
        // color: '#3B82F6',
    },
});
