import { lazy } from 'react';

export const CountryNavigator = lazy(
  () => import('@features/countries/ui/navigation/CountryNavigator'),
);
