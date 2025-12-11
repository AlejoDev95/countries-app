import { Country } from '../entities/Country';
import { ICountryRepository } from '../repositories/ICountryRepository';

export type GetCountryByCode = (
  repository: ICountryRepository,
  code: string,
) => Promise<Country | null>;

export const getCountryByCode: GetCountryByCode = async (repository, code) => {
  return await repository.getByCode(code);
};
