import { useState } from 'react';
import { Country } from '../../domain/entities/Country';
import { searchCountries } from '../../domain/use-cases/SearchCountries';
import { useCountryContext } from '../../infrastructure/di/CountryContext';

export const useSearchCountries = () => {
  const { repository } = useCountryContext();
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchCountries(repository, query);
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
    search,
    clear,
  };
};
