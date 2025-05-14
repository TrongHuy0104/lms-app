import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

// Define your custom themes
const LightTheme = {
    dark: false,
    colors: {
        background: '#ffffff',
        text: '#000000',
    },
};

const DarkTheme = {
    dark: true,
    colors: {
        background: '#000000',
        text: '#ffffff',
    },
};

// Define the shape of the context
interface ThemeContextType {
    theme: typeof LightTheme | typeof DarkTheme;
    toggleTheme: () => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>({
    theme: LightTheme,
    toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const systemColorScheme = useColorScheme();
    const [theme, setTheme] = useState(
        systemColorScheme === 'dark' ? DarkTheme : LightTheme
    );

    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await AsyncStorage.getItem('userTheme');
            if (savedTheme) {
                setTheme(savedTheme === 'dark' ? DarkTheme : LightTheme);
            } else {
                setTheme(systemColorScheme === 'dark' ? DarkTheme : LightTheme);
            }
        };
        loadTheme();
    }, [systemColorScheme]);

    const toggleTheme = async () => {
        const newTheme = theme === DarkTheme ? LightTheme : DarkTheme;
        setTheme(newTheme);
        await AsyncStorage.setItem(
            'userTheme',
            newTheme.dark ? 'dark' : 'light'
        );
    };

    return (
        <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>
    );
};

export const useTheme = () => useContext(ThemeContext);
