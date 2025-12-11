import React, {
  createContext,
  useContext,
  ReactNode,
  PropsWithChildren,
} from 'react';
import { ICountryRepository } from '../../domain/repositories/ICountryRepository';
import { createCountryRepository } from '../repositories/CountryRepositoryImpl';
import { graphqlClient } from '@core/infrastructure/http/apollo/apolloClient';

interface CountryContextType {
  repository: ICountryRepository;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

type CountryProviderProps = PropsWithChildren;

export const CountryProvider: React.FC<CountryProviderProps> = ({
  children,
}) => {
  const repository = createCountryRepository(graphqlClient);
  return (
    <CountryContext.Provider value={{ repository }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountryContext = (): CountryContextType => {
  const context = useContext(CountryContext);

  if (!context) {
    throw new Error('useCountryContext must be used within a CountryProvider');
  }

  return context;
};
