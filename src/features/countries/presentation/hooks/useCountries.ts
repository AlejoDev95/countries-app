import { useState, useEffect } from 'react';
import { Country } from '../../domain/entities/Country';
import { getAllCountries } from '../../domain/use-cases/GetAllCountries';
import { useCountryContext } from '../../infrastructure/di/CountryContext';

export const useCountries = () => {
  const { repository } = useCountryContext();
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllCountries(repository);
      setCountries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return {
    countries,
    loading,
    error,
    refetch: fetchCountries,
  };
};
