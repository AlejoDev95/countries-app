import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type CountriesParamsList = {
  listOfCountries: undefined;
  countryDetails: { code: string };
};

export type CountryNav = NativeStackNavigationProp<CountriesParamsList>;
