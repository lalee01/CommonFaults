import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ModalContextProvider} from './components/hooks/UseModal'
import { setContext } from '@apollo/client/link/context'


const httpLink = createHttpLink({
    uri: 'http://localhost:3002/graphql',
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