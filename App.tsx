import { AnimatedAppLoader } from './src/components/splashScreen';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Navigator } from './src/navigation/Navigator';
import { CartContextProvider } from './src/context/cartData';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://sfcc-graphql-oin4zm57wq-ew.a.run.app/graphql',
  cache: new InMemoryCache(),
});

const PlaceholderImage = require('./assets/splash-screen-costes.png');

export default function App() {
  return (
    <CartContextProvider>
      <ApolloProvider client={client}>
        <AnimatedAppLoader image={PlaceholderImage}>
          <Navigator />
        </AnimatedAppLoader>
      </ApolloProvider>
    </CartContextProvider>
  );
}
