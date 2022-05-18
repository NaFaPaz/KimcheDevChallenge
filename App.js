import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { SearchBar } from './components';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/',
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <SearchBar />
    </ApolloProvider>
  );
};
export default App;
