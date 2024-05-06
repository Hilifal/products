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
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5ydSIsInN1YiI6MSwibmFtZSI6ItCc0LXRgNC70LjQvtC9Iiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3MTQ5OTE1NTAsImV4cCI6MTcxNDk5NTE1MH0.Giy8hSgDWJqeQN-Rm0mcMn7j5p6fetW1hwue6h9x2kA';

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
