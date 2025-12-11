import { AppNavigator } from '@navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

export const NavigationProvider = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};
