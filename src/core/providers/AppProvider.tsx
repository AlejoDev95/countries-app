import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProvider } from './NavigationProvider';

export const AppProvider = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationProvider />
    </SafeAreaView>
  );
};
