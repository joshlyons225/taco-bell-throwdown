import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// import all sections from pages dir here
import Home from './components/Home';
import Navbar from './components/Navbar';
import Champion from './components/Champion';
import Throwdown from './components/Throwdown';
import Signup from './components/Signup';
import Login2 from './components/Login2';
import Footer from './components/Footer';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='main'>
          <Navbar />
          <Home />
          <Champion />
          <Throwdown />
          <Footer />
          <Routes>
            <Route path='/login' element={<Login2 />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
