import "@/styles/globals.css";
// Environment
import type { AppProps } from "next/app";
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { onError } from '@apollo/client/link/error';

// const errorLink = onError(({graphQLErrors, operation, forward}) => {
//   if (graphQLErrors) {
//     for (const iterator of graphQLErrors) {
//       if (iterator.extensions.code === "UNAUTHENTICATED"){

//         return new Observable(observer => {
//           authProvider.refresh()

//           .then(refreshResponse => {
//             const oldHeaders = operation.getContext().headers;

//             operation.setContext({
//               headers: {
//                 ...oldHeaders,
//                 authorization: `Bearer ${refreshResponse?.access_token}`
//               }
//             });
//           })

//           .then(() => {
//             const subscriber = {
//               next: observer.next.bind(observer),
//               error: observer.error.bind(observer),
//               complete: observer.complete.bind(observer)
//             };

//             // Retry last failed request
//             forward(operation).subscribe(subscriber);
//           })

//           .catch(error => {
//             // No refresh or client token available, we force user to login
//             observer.error(error);
//           });
//         });
//       }
//     }
//   }
// });

const httpLink = createHttpLink({
  uri: 'https://mplace-backend.dev-vt2b.ru/graphql',
});

const authLink = setContext((_, {headers}) => {
  // const token = Cookie.get(COOKIE_ACCESS_TOKEN);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjM0QHRlc3Q1LnJ1Iiwic3ViIjo0OCwibmFtZSI6ItCQ0LvQtdC60YHQtdC5INCQ0LvQtdC60YHQtdC10LLQuNGHICIsInJvbGVzIjpbIlVTRVIiXSwiaWF0IjoxNzE1MDc0NjE0LCJleHAiOjE3MTUwNzgyMTR9.4fKDInTRShGc-fPnt6OHT3tJ5tX9kEyCAZqbMSoqSBM';

  // Кастомизация заголовков под конкретные запросы
  //
  // const customHeaders: {
  //   [key: string]: any
  // } = {
  //   login : { headers },

  // };

  const defaultHeaders = {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  };

  return defaultHeaders;
  // return customHeaders[_.operationName || 'login'] || defaultHeaders;

});

const client = new ApolloClient({
  //uri: 'https://flyby-router-demo.herokuapp.com/',
  // uri: 'https://mplace-backend.dev-vt2b.ru/graphql',
  link:  authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


export default function App({ Component, pageProps }: AppProps) {
  return(
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  ) 
}
