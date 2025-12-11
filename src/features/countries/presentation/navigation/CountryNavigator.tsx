import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CountryProvider } from '../../infrastructure/di/CountryContext';
import { Countries, CountryDetails } from '../screens';
import { CountriesParamsList } from './countriesParamsList';

const Stack = createNativeStackNavigator<CountriesParamsList>();

const AuthNavigator = () => {
  return (
    <CountryProvider>
      <Stack.Navigator
        initialRouteName="listOfCountries"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="listOfCountries" component={Countries} />
        <Stack.Screen name="countryDetails" component={CountryDetails} />
      </Stack.Navigator>
    </CountryProvider>
  );
};

export default AuthNavigator;
