import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AppNavigator } from '../../navigation/AppNavigator';

export const NavigationProvider = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};
