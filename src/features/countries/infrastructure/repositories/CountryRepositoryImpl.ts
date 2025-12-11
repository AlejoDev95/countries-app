import { Country } from '../../domain/entities/Country';
import { ICountryRepository } from '../../domain/repositories/ICountryRepository';
import { IGraphQLClient } from '@core/infrastructure/http/interfaces/IGraphQLClient';
import {
  mapCountryDTOToDomain,
  mapCountriesDTOArrayToDomain,
  CountryDTO,
} from '../mappers/CountryMapper';
import {
  GET_ALL_COUNTRIES_QUERY,
  GET_COUNTRY_BY_CODE_QUERY,
  SEARCH_COUNTRIES_QUERY,
  FILTER_COUNTRIES_QUERY,
  GraphQLCountryResponse,
  GraphQLSingleCountryResponse,
} from '../graphql/CountryQueries';
import { graphqlClient } from '@core/infrastructure/http/apollo/apolloClient';

export type CreateCountryRepository = (
  graphqlClient: IGraphQLClient,
) => ICountryRepository;

export const createCountryRepository: CreateCountryRepository = (
  graphqlClient: IGraphQLClient,
) => {
  return {
    async getAll(): Promise<Country[]> {
      const response = await graphqlClient.query<GraphQLCountryResponse>(
        GET_ALL_COUNTRIES_QUERY,
      );

      return mapCountriesDTOArrayToDomain(response.countries);
    },

    async getByCode(code: string): Promise<Country | null> {
      const response = await graphqlClient.query<GraphQLSingleCountryResponse>(
        GET_COUNTRY_BY_CODE_QUERY,
        { code },
      );

      if (!response.country) {
        return null;
      }

      return mapCountryDTOToDomain(response.country);
    },

    async search(query: string): Promise<Country[]> {
      const response = await graphqlClient.query<GraphQLCountryResponse>(
        SEARCH_COUNTRIES_QUERY,
      );

      const countries = mapCountriesDTOArrayToDomain(response.countries);

      return countries.filter(country =>
        country.name.toLowerCase().includes(query.toLowerCase()),
      );
    },

    async filterByContinentAndCurrency(
      continent?: string,
      currency?: string,
    ): Promise<Country[]> {
      if (continent) {
        const response = await graphqlClient.query<GraphQLCountryResponse>(
          FILTER_COUNTRIES_QUERY,
          { continentCode: continent },
        );
        let countries = mapCountriesDTOArrayToDomain(response.countries);

        if (currency) {
          countries = countries.filter(
            country =>
              country.currency.toLowerCase() === currency.toLowerCase(),
          );
        }

        return countries;
      }

      if (currency) {
        const response = await graphqlClient.query<GraphQLCountryResponse>(
          GET_ALL_COUNTRIES_QUERY,
        );

        const countries = mapCountriesDTOArrayToDomain(response.countries);

        return countries.filter(
          country => country.currency.toLowerCase() === currency.toLowerCase(),
        );
      }

      const response = await graphqlClient.query<GraphQLCountryResponse>(
        GET_ALL_COUNTRIES_QUERY,
      );

      return mapCountriesDTOArrayToDomain(response.countries);
    },
  };
};
