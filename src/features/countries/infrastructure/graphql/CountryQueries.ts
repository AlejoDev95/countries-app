export interface GraphQLCountryResponse {
  countries: Array<{
    code: string;
    name: string;
    emoji: string;
    continent: { name: string };
    currency?: string;
    capital?: string;
    languages: Array<{ name: string }>;
  }>;
}

export interface GraphQLSingleCountryResponse {
  country: {
    code: string;
    name: string;
    emoji: string;
    continent: { name: string };
    currency?: string;
    capital?: string;
    languages: Array<{ name: string }>;
  } | null;
}

export const GET_ALL_COUNTRIES_QUERY = `
	query GetAllCountries {
		countries {
			code
			name
			emoji
			continent { name }
			currency
			capital
			languages { name }
		}
	}
`;

export const GET_COUNTRY_BY_CODE_QUERY = `
  query GetCountryByCode($code: ID!) {
    country(code: $code) {
      code
      name
      emoji
      continent {
        name
      }
      currency
      capital
      languages {
        name
      }
    }
  }
`;

export const SEARCH_COUNTRIES_QUERY = `
  query SearchCountries {
    countries {
      code
      name
      emoji
      continent {
        name
      }
      currency
      capital
      languages {
        name
      }
    }
  }
`;

export const FILTER_COUNTRIES_QUERY = `
  query FilterCountries($continentCode: String) {
    countries(filter: { continent: { eq: $continentCode } }) {
      code
      name
      emoji
      continent {
        name
      }
      currency
      capital
      languages {
        name
      }
    }
  }
`;
