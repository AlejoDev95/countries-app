import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { createApolloGraphQLClient } from '../clients/apollo/ApolloGraphQLClient';
import { IGraphQLClient } from '../interfaces/IGraphQLClient';

export function makeApolloClient(
  uri = 'https://countries.trevorblades.com/graphql',
) {
  const link = new HttpLink({ uri });
  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
      query: { fetchPolicy: 'network-only' },
    },
  });
}

export const apolloClient = makeApolloClient();
export const graphqlClient: IGraphQLClient =
  createApolloGraphQLClient(apolloClient);
