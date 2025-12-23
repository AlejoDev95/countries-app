import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="countries"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="countries"
        getComponent={() => require('@features/countries/presentation/navigation/CountryNavigator').default}
      />
    </Stack.Navigator>
  );
};
