import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './navigation/AppNavigator';
import { ThemeProvider } from './theme/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  return (
    <SafeAreaProvider>
    <ThemeProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </ThemeProvider>
    </SafeAreaProvider>
  );
}