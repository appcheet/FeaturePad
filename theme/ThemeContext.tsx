import React, { createContext, useContext, ReactNode } from 'react';
import { useThemeStore } from '../store/themeStore';
import { lightTheme, darkTheme } from './themes';
import { Theme } from '../types';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (mode: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { themeMode, toggleTheme, setTheme } = useThemeStore();
  
  const theme = themeMode === 'dark' ? darkTheme : lightTheme;
  const isDark = themeMode === 'dark';

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};