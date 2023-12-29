import { useEffect } from "react";
import { createContext, useState } from "react";

export const ThemeContext = createContext({});

export const ThemeContextProvider = ({ children }) => {
    
    const [theme, setTheme] = useState('');
    
    useEffect(() => {
        let currentTheme = localStorage.getItem('theme');

        if (currentTheme != null) {
            if(currentTheme === 'system'){
                const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
                setTheme('system');
            }
            else {
                setTheme(currentTheme);
            }
        }
        else {
            setTheme('dark');
            localStorage.setItem('theme', 'dark');
        }
    }, [])

    useEffect(() => {
        if(theme === 'system'){
            const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.body.classList = `${isDarkTheme?'dark':'light'}-theme`
        }
        else {
            document.body.classList = `${theme}-theme`;
        }
        localStorage.setItem('theme', theme);
    }, [theme])

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
        const handleSystemThemeChange = (event) => {
            document.body.classList = `${event.matches?'dark':'light'}-theme`
        };
    
        mediaQuery.addEventListener('change', handleSystemThemeChange);
    
        return () => {
          mediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
      }, []);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}