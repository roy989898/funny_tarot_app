// i18n.ts
import {I18n} from 'i18n-js';
import * as Localization from 'expo-localization';

// Define translation structure with TypeScript
const en = {
    /* welcome: 'Welcome111',
     greeting: 'Hello, {{name}}!',
     home: {
         title: 'Home Screen',
         subtitle: 'This is the home screen'
     },
     buttons: {
         submit: 'Submit',
         cancel: 'Cancel'
     },*/
    auth: {
        welcomeBack: 'Welcome Back',
        signInToContinue: 'Sign in to continue',
        email: 'Email',
        password: 'Password',
        enterYourEmail: 'Enter your email',
        enterYourPassword: 'Enter your password',
        signIn: 'Sign In',
        dontHaveAccount: "Don't have an account?",
        signUp: 'Sign up',

        hello: "Hello",
        registerToStart: 'Sign up to continue',
        register: "Sign up",
        haveAccount: "Have an account?",
        sendCode: "Send Code",


    }
} as const;

const es = {

    auth: {
        welcomeBack: 'Welcome Back',
        signInToContinue: 'Sign in to continue',
        email: 'Email',
        password: 'Password',
        enterYourEmail: 'Enter your email',
        enterYourPassword: 'Enter your password',
        signIn: 'Sign In',
        dontHaveAccount: "Don't have an account?",
        signUp: 'Sign up',

        hello: "Hello",
        registerToStart: 'Sign up to continue',
        register: "Sign up",
        haveAccount: "Have an account?",
        sendCode: "Send Code",


    }
} as const;

const fr = {

    auth: {
        welcomeBack: 'Welcome Back',
        signInToContinue: 'Sign in to continue',
        email: 'Email',
        password: 'Password',
        enterYourEmail: 'Enter your email',
        enterYourPassword: 'Enter your password',
        signIn: 'Sign In',
        dontHaveAccount: "Don't have an account?",
        signUp: 'Sign up',

        hello: "Hello",
        registerToStart: 'Sign up to continue',
        register: "Sign up",
        haveAccount: "Have an account?",
        sendCode: "Send Code",

    }
} as const;

// Define translations object
const translations = {
    en,
    es,
    fr
};

// Export type for translation keys
export type TranslationKeys = typeof en;
export type Locale = keyof typeof translations;

// Create i18n instance
const i18n = new I18n(translations);

// Set the locale once at the beginning of your app
i18n.locale = 'en';

// Enable fallback to another language if translation is missing
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

export default i18n;
