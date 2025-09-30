// i18n.ts
import {I18n} from 'i18n-js';
import * as Localization from 'expo-localization';

// Define translation structure with TypeScript
const en = {
    welcome: 'Welcome111',
    greeting: 'Hello, {{name}}!',
    home: {
        title: 'Home Screen',
        subtitle: 'This is the home screen'
    },
    buttons: {
        submit: 'Submit',
        cancel: 'Cancel'
    }
} as const;

const es = {
    welcome: 'Bienvenido',
    greeting: '¡Hola, {{name}}!',
    home: {
        title: 'Pantalla de Inicio',
        subtitle: 'Esta es la pantalla de inicio'
    },
    buttons: {
        submit: 'Enviar',
        cancel: 'Cancelar'
    }
} as const;

const fr = {
    welcome: 'Bienvenue',
    greeting: 'Bonjour, {{name}}!',
    home: {
        title: 'Écran d\'accueil',
        subtitle: 'Ceci est l\'écran d\'accueil'
    },
    buttons: {
        submit: 'Soumettre',
        cancel: 'Annuler'
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
