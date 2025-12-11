import { Country } from '@features/countries/domain/entities/Country';

export interface CountryDTO {
  code: string;
  name: string;
  emoji: string;
  continent: { name: string };
  currency?: string;
  capital?: string;
  languages: Array<{ name: string }>;
}

export const mapCountryDTOToDomain = (dto: CountryDTO): Country => {
  return {
    code: dto.code,
    name: dto.name,
    emoji: dto.emoji,
    continent: dto.continent.name,
    currency: dto.currency || 'N/A',
    capital: dto.capital || 'N/A',
    languages: dto.languages.map(lang => lang.name),
  };
};

export const mapCountriesDTOArrayToDomain = (dtos: CountryDTO[]): Country[] => {
  return dtos.map(mapCountryDTOToDomain);
};
