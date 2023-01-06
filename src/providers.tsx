import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ModalContextProvider} from './components/hooks/UseModal'
import { setContext } from '@apollo/client/link/context'

const url = window.location.hostname
const serverURL = import.meta.env.VITE_APP_URL
console.log(`${serverURL}/graphql`)

const httpLink = createHttpLink({
    uri: `${serverURL}/graphql` ,  // `http://${url}:3000/graphql`,
    credentials: 'same-origin'
  });
  
  const authLink = setContext((_, { headers }) => {
   const token = localStorage.getItem('token');

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

type ProviderProps = {
    children: ReactNode
}

const Providers = ({children}:ProviderProps) => (
    <BrowserRouter>
        <ApolloProvider client={client}>
            <ModalContextProvider>
                {children}
            </ModalContextProvider>
        </ApolloProvider>
    </BrowserRouter>
)

export default Providers