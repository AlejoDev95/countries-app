import { Country } from '../entities/Country';
import { ICountryRepository } from '../repositories/ICountryRepository';

export type GetAllCountries = (
  repository: ICountryRepository,
) => Promise<Country[]>;

export const getAllCountries: GetAllCountries = async repository => {
  return await repository.getAll();
};
