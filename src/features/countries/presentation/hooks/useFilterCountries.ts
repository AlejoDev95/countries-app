import { useState } from 'react';
import { Country } from '../../domain/entities/Country';
import { filterCountriesByContinentAndCurrency } from '../../domain/use-cases/FilterCountriesByContinentAndCurrency';
import { useCountryContext } from '../../infrastructure/di/CountryContext';

export const useFilterCountries = () => {
  const { repository } = useCountryContext();
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const filter = async (continent?: string, currency?: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await filterCountriesByContinentAndCurrency(
        repository,
        continent,
        currency,
      );
      setCountries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setCountries([]);
    setError(null);
  };

  return {
    countries,
    loading,
    error,
    filter,
    clear,
  };
};
