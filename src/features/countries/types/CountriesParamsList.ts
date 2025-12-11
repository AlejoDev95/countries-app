import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type CountriesParamsList = {
  listOfCountries: undefined;
  countryDetails: undefined;
};

export type CountryNav = NativeStackNavigationProp<CountriesParamsList>;
