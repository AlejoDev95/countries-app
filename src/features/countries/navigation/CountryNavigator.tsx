import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Countries, CountryDetails } from '../screens';
import { CountriesParamsList } from '../types/CountriesParamsList';

const Stack = createNativeStackNavigator<CountriesParamsList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="listOfCountries"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="listOfCountries" component={Countries} />
      <Stack.Screen name="countryDetails" component={CountryDetails} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
