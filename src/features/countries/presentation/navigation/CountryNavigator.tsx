import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CountryProvider } from '../../infrastructure/di/CountryContext';
import { CountriesParamsList } from './countriesParamsList';

const Stack = createNativeStackNavigator<CountriesParamsList>();

const CountryNavigator = () => {
  return (
    <CountryProvider>
      <Stack.Navigator
        initialRouteName="listOfCountries"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="listOfCountries"
          getComponent={() => require('../screens/Countries').Countries}
        />
        <Stack.Screen
          name="countryDetails"
          getComponent={() => require('../screens/CountryDetails').CountryDetails}
        />
      </Stack.Navigator>
    </CountryProvider>
  );
};

export default CountryNavigator;
