import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthStore } from '../store/authStore';

import { OnboardingScreen } from '../screens/OnboardingScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { WriteLetterScreen } from '../screens/WriteLetterScreen';
import { LetterArchiveScreen } from '../screens/LetterArchiveScreen';
import { ReadLetterScreen } from '../screens/ReadLetterScreen';

const Stack = createStackNavigator();

export const AppNavigator: React.FC = () => {
  const { isAuthenticated, hasCompletedOnboarding } = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasCompletedOnboarding ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : !isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="WriteLetter" component={WriteLetterScreen} />
            <Stack.Screen name="LetterArchive" component={LetterArchiveScreen} />
            <Stack.Screen name="ReadLetter" component={ReadLetterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};