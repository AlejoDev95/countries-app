import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Suspense } from 'react';
import { Loader } from '../shared/components/Loader';
import { CountryNavigator } from './LazyNavigators';
import { RootStackParamList } from './types/RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="countries"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="countries">
        {() => (
          <Suspense fallback={<Loader />}>
            <CountryNavigator />
          </Suspense>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
