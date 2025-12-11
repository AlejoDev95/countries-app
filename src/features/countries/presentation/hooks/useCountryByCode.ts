import { useState, useEffect } from 'react';
import { Country } from '../../domain/entities/Country';
import { getCountryByCode } from '../../domain/use-cases/GetCountryByCode';
import { useCountryContext } from '../../infrastructure/di/CountryContext';

export const useCountryByCode = (code: string) => {
  const { repository } = useCountryContext();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCountry = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCountryByCode(repository, code);
      setCountry(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (code) {
      fetchCountry();
    }
  }, [code]);

  return {
    country,
    loading,
    error,
    refetch: fetchCountry,
  };
};
