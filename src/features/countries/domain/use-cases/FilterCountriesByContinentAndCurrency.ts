import { Country } from '../entities/Country';
import { ICountryRepository } from '../repositories/ICountryRepository';

export type FilterCountriesByContinentAndCurrency = (
  repository: ICountryRepository,
  continent?: string,
  currency?: string,
) => Promise<Country[]>;

export const filterCountriesByContinentAndCurrency: FilterCountriesByContinentAndCurrency =
  async (repository, continent, currency) => {
    return await repository.filterByContinentAndCurrency(continent, currency);
  };
