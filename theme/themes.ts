import { Theme } from '../types';

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#E69A8D',
    background: '#FFEEE6',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    text: '#333333',
    textSecondary: '#666666',
    border: '#E0E0E0',
    notification: '#FF6B6B',
    error: '#FF4444',
    success: '#4CAF50',
    warning: '#FFA726',
    accent: '#E69A8D',
    placeholder: '#999999',
    icon: '#666666',
    shadow: '#000000',
  },
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    primary: '#E69A8D',
    background: '#1A1A1A',
    surface: '#2D2D2D',
    card: '#383838',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
    border: '#404040',
    notification: '#FF6B6B',
    error: '#FF6B6B',
    success: '#4CAF50',
    warning: '#FFA726',
    accent: '#E69A8D',
    placeholder: '#888888',
    icon: '#CCCCCC',
    shadow: '#000000',
  },
};