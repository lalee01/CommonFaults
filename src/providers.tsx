import { ApolloClient, InMemoryCache, ApolloProvider , useQuery , gql} from '@apollo/client';
import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

const client = new ApolloClient({
    uri: 'http://localhost:3004/graphql',
    cache: new InMemoryCache(),
})

type ProviderProps = {
    children: ReactNode
}

const Providers = ({children}:ProviderProps) => (
    <BrowserRouter>
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    </BrowserRouter>
)

export default Providers