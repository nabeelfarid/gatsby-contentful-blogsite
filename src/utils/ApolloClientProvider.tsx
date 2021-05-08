import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import fetch from "cross-fetch";

const authLink = setContext((_, { headers }) => {
  const token = process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

const httpLink = new HttpLink({
  uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
  // add isomorphic-fetch to your dependencies since apollo looks for fetch to make HTTP requests
  // https://github.com/gatsbyjs/gatsby/issues/11225#issuecomment-457211628
  fetch,
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

interface ApolloClientProviderProps {}

const ApolloClientProvider: React.FC<ApolloClientProviderProps> = (props) => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default ApolloClientProvider;
