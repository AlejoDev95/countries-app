import { ApolloClient, DocumentNode, gql } from '@apollo/client';
import { IGraphQLClient } from '../../interfaces/IGraphQLClient';

export const createApolloGraphQLClient = (
  client: ApolloClient,
): IGraphQLClient => {
  return {
    async query<T>(query: string, variables?: Record<string, any>): Promise<T> {
      try {
        const parsedQuery: DocumentNode = gql`
          ${query}
        `;

        const result = await client.query({
          query: parsedQuery,
          variables,
          fetchPolicy: 'network-only',
        });

        return result.data as T;
      } catch (error) {
        throw handleError(error);
      }
    },

    async mutate<T>(
      mutation: string,
      variables?: Record<string, any>,
    ): Promise<T> {
      try {
        const parsedMutation: DocumentNode = gql`
          ${mutation}
        `;

        const result = await client.mutate({
          mutation: parsedMutation,
          variables,
        });

        return result.data as T;
      } catch (error) {
        throw handleError(error);
      }
    },
  };
};

const handleError = (error: any): Error => {
  if (error.networkError) {
    return new Error(`Network error: ${error.networkError.message}`);
  }

  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    return new Error(`GraphQL error: ${error.graphQLErrors[0].message}`);
  }

  return new Error(error.message || 'Unknown GraphQL error');
};
