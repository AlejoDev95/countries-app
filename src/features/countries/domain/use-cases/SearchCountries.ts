import { Country } from '../entities/Country';
import { ICountryRepository } from '../repositories/ICountryRepository';

export type SearchCountries = (
  repository: ICountryRepository,
  query: string,
) => Promise<Country[]>;

export const searchCountries: SearchCountries = async (repository, query) => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  return await repository.search(query);
};
