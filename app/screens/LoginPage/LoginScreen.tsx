import {View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform} from "react-native";
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
    interpolate,
    useDerivedValue,
    runOnJS,
} from 'react-native-reanimated';
import {useI18n} from "@/i18n/I18nContext";
import {TAROT_CARDS} from "@/app/StaticValue";
import {useNavigation} from "expo-router";
import {myColor} from "@/color";
// Array of all tarot cards


type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen(/*{navigation}: Props*/): React.JSX.Element {
    const {t, changeLanguage} = useI18n();
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pin, setPin] = useState("")
    const [currentCard, setCurrentCard] = useState(TAROT_CARDS[0]);
    const [isRegister, setIsRegister] = useState(false);
    const navigation = useNavigation();

    // Animation setup for spinning card
    const rotation = useSharedValue(0);
    const cardIndex = useSharedValue(0);

    const getRandomCard = () => {
        const randomIndex = Math.floor(Math.random() * TAROT_CARDS.length);
        setCurrentCard(TAROT_CARDS[randomIndex]);
        cardIndex.value = randomIndex;
    };

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(0, {duration: 1500}),
            -1,
            true
        );


        // Change card and toggle back/face every 1.5 seconds
        const interval = setInterval(() => {
            getRandomCard()
        }, 1500);

        return () => clearInterval(interval);
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
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.content}>

                <View style={styles.header}>
                    {/*TODO here change to ICON or something*/}
                    {/*<Text>{t('welcome')}</Text>*/}
                    <Animated.View style={animatedStyle}>
                        <Image
                            source={/*showBack ? require('../../../assets/images/tarot__back.png') :*/ currentCard}
                            style={{width: 80, height: 120}}
                        />
                    </Animated.View>
                    {isRegister ? (

                        <>
                            <Text style={{...styles.title}}>{t('auth.hello')}</Text>
                            <Text style={styles.subtitle}>{t('auth.registerToStart')}</Text>
                        </>
                    ) : (
                        <>
                            <Text style={styles.title}>{t('auth.welcomeBack')}</Text>
                            <Text style={styles.subtitle}>{t('auth.signInToContinue')}</Text>
                        </>
                    )}

                </View>

                <View style={styles.form}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {/*<Text style={styles.label}>Email</Text>*/}
                        <View style={{...styles.inputGroup, flex: 1}}>
                            <TextInput
                                label={t('auth.email')}
                                style={{...styles.input}}
                                value={email}
                                onChangeText={setEmail}
                                placeholder={t('auth.enterYourEmail')}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoComplete="email"
                            />
                        </View>


                        {isRegister ? (<>
                            <Button style={{borderRadius: 0}} icon="send" mode="text"
                                    onPress={() => console.log('Pressed')}>
                                {t('auth.sendCode')}
                            </Button></>) : (<></>)}


                    </View>
                    {/*TODO pin code*/}


                    {isRegister ? (<>


                        <View style={styles.inputGroup}>
                            {/*<Text style={styles.label}>Password</Text>*/}
                            <TextInput
                                label={t('auth.pinCode')}
                                style={styles.input}
                                value={pin}
                                onChangeText={setPin}
                                placeholder={t('auth.enterYourPin')}


                            />
                        </View>
                    </>) : (<></>)}


                    <View style={styles.inputGroup}>
                        {/*<Text style={styles.label}>Password</Text>*/}
                        <TextInput
                            label={t('auth.password')}
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            placeholder={t('auth.enterYourPassword')}
                            secureTextEntry
                            autoComplete="password"
                        />
                    </View>

                    {/* <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>*/}


                    {isRegister ? (
                        <>


                            <Button mode="contained" onPress={() => console.log('Register')}>
                                {t('auth.register')}
                            </Button>

                        </>
                    ) : (
                        <>

                            <Button mode="contained" onPress={() => {
                                console.log('Sign In')
                                // @ts-ignore
                                navigation.push('Home')

                            }}>
                                {t('auth.signIn')}
                            </Button>


                        </>
                    )}
                </View>

                <View style={styles.footer}>


                    {isRegister ? (<>


                        <Text style={styles.footerText}>{t('auth.haveAccount')}</Text>
                        <TouchableOpacity onPress={() => setIsRegister(false)}>
                            <Text style={{color: theme.colors.primary, ...styles.footerLink}}>{t('auth.signIn')}</Text>
                        </TouchableOpacity>

                    </>) : (<>

                        <Text style={styles.footerText}>{t('auth.dontHaveAccount')}</Text>
                        <TouchableOpacity onPress={() => setIsRegister(true)}>
                            <Text style={{color: theme.colors.primary, ...styles.footerLink}}>{t('auth.signUp')}</Text>
                        </TouchableOpacity>

                    </>)}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        /*     backgroundColor: '#FFFFFF',*/
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
        color: myColor.text,
        marginBottom: 8, // 8pt × 1
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16, // 8pt × 2
        color: myColor.subText,
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
    // label: {
    //     fontSize: 16, // 8pt × 2
    //     fontWeight: '500',
    //     color: '#374151',
    //     marginBottom: 8, // 8pt × 1
    // },
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
    // buttonText: {
    //     fontSize: 16, // 8pt × 2
    //     // fontWeight: '600',
    //     // color: '#FFFFFF',
    // },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8, // 8pt × 1
        marginTop: 32, // 8pt × 4
    },
    footerText: {
        fontSize: 16, // 8pt × 2
        color: myColor.subText,
    },
    footerLink: {
        fontSize: 16, // 8pt × 2
        fontWeight: '600',
        // color: '#3B82F6',
    },
});
