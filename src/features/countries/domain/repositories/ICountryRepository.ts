import { Country } from '../entities/Country';

export interface ICountryRepository {
  getAll(): Promise<Country[]>;
  getByCode(code: string): Promise<Country | null>;
  search(query: string): Promise<Country[]>;
  filterByContinentAndCurrency(
    continent?: string,
    currency?: string,
  ): Promise<Country[]>;
}
