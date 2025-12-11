export interface IGraphQLClient {
  query<T>(query: string, variables?: Record<string, any>): Promise<T>;
  mutate<T>(mutation: string, variables?: Record<string, any>): Promise<T>;
}

export interface GraphQLRequestConfig {
  fetchPolicy?: 'cache-first' | 'network-only' | 'cache-only' | 'no-cache';
  errorPolicy?: 'none' | 'ignore' | 'all';
}
