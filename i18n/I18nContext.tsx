// I18nContext.tsx
import React, {createContext, useContext, useState, ReactNode} from 'react';
import i18n, {Locale} from './i18n';

interface I18nContextType {
    locale: string;
    changeLanguage: (lang: Locale) => void;
    t: (key: string, options?: Record<string, any>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
    children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({children}) => {
    const [locale, setLocale] = useState<string>(i18n.locale);

    const changeLanguage = (lang: Locale) => {
        i18n.locale = lang;
        setLocale(lang);
    };

    const t = (key: string, options?: Record<string, any>): string => {
        return i18n.t(key, options);
    };

    return (
        <I18nContext.Provider value={{locale, changeLanguage, t}}>
            {children}
        </I18nContext.Provider>
    );
};

export const useI18n = (): I18nContextType => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
};

// Example usage in a component:
//
// import { useI18n } from './I18nContext';
//
// function MyComponent() {
//   const { t, changeLanguage, locale } = useI18n();
//
//   return (
//     <View>
//       <Text>{t('welcome')}</Text>
//       <Text>{t('greeting', { name: 'John' })}</Text>
//       <Button title="Switch to Spanish" onPress={() => changeLanguage('es')} />
//     </View>
//   );
// }
