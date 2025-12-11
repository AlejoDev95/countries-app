import { GRAPHQL_ENDPOINT, APP_NAME, APP_VERSION } from '@env';

export const ENV = {
  GRAPHQL_ENDPOINT:
    GRAPHQL_ENDPOINT || 'https://countries.trevorblades.com/graphql',

  APP_NAME: APP_NAME || 'CountriesApp',
  APP_VERSION: APP_VERSION || '0.0.1',
  IS_DEV: __DEV__,
} as const;

export default ENV;
