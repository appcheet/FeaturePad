import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { CustomDrawer } from '../components/CustomDrawer';
import { useAppStore } from '../store/useAppStore';

import { HomeScreen } from '../screens/HomeScreen';
import { LetterArchiveScreen } from '../screens/LetterArchiveScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { ReadLetterScreen } from '../screens/ReadLetterScreen';
import { WriteLetterScreen } from '../screens/WriteLetterScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 320,
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="WriteLetter" component={WriteLetterScreen} />
      <Drawer.Screen name="LetterArchive" component={LetterArchiveScreen} />
    </Drawer.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const { isOnboardingCompleted } = useAppStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isOnboardingCompleted ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainDrawerNavigator} />
            <Stack.Screen name="ReadLetter" component={ReadLetterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};