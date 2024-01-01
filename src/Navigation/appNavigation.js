import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from './authNavigation';
import OnboardingScreen from '../Screens/OnboardingScreen.js';
import SearchScreen2 from '@/Screens/SearchScreen2';
import MainNavigator from './MainNavigation.js';
import { getItem } from '@/Utils/asyncStorage.js';
import ImagePreviewScreen from '@/Screens/ImagePreviewScreen';
import SuggestionScreen from '@/Screens/SuggestionScreen';
import EditScreen from '@/Screens/EditScreen';
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [showOnboarding, setShowOnboarding] = useState(null);
  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem('onboarded');
    if (onboarded == 1) {
      // hide onboarding
      setShowOnboarding(false);
    } else {
      // show onboarding
      setShowOnboarding(true);
    }
  };

  if (showOnboarding == null) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={showOnboarding ? "Onboarding" : "Login"}>
        <Stack.Screen
          name="Onboarding"
          options={{ headerShown: false }}
          component={OnboardingScreen}
        />
        <Stack.Screen
          name="Auth"
          options={{ headerShown: false }}
          component={AuthNavigator}
        />
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          component={MainNavigator}
        />
        <Stack.Screen
          name="Search2"
          options={{ headerShown: false }}
          component={SearchScreen2}
        />
        {/* <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={HomeScreen}
          /> */}
        <Stack.Screen
          name="ImagePreview"
          options={{ headerShown: false }}
          component={ImagePreviewScreen}
        />
        <Stack.Screen
          name="Edit"
          options={{ headerShown: false }}
          component={EditScreen}
        />
        <Stack.Screen
          name="Suggestion"
          options={{ headerShown: false }}
          component={SuggestionScreen}
        />
      </Stack.Navigator>
      {/* <MainNavigation></MainNavigation> */}
    </NavigationContainer>
  );
}
