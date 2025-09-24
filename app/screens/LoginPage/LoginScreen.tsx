import {View, StyleSheet, TouchableOpacity} from "react-native";
import {Text, TextInput, Button, useTheme} from 'react-native-paper'

import {SafeAreaView} from "react-native-safe-area-context";
import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import type {RootStackParamList} from "@/App";
import React, {useState} from "react";

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({navigation}: Props): React.JSX.Element {
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SafeAreaView style={{
            ...styles.container, backgroundColor: theme.colors.background
        }}>
            <View style={styles.content}>
                <View style={styles.header}>
                    {/*TODO here change to ICON or something*/}
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
