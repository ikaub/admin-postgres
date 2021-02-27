import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.scss';
import { Auth } from './pages/Auth/Auth';
import { User } from './pages/User/User';
import { Header } from './components/Header/Header';
import { CreateProfile } from './pages/CreateProfile/CreateProfile';
import { Admin } from './pages/Admin/Admin';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem('user') as string)?.token || '';
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/auth">
            <Auth/>
          </Route>
          <Route>
            <Header/>
            <Route path="/users/:id">
              <User/>
            </Route>
            <Route path="/create-profile">
              <CreateProfile/>
            </Route>
            <Route path="/admin">
              <Admin/>
            </Route>
          </Route>
          <Route path="*">
            <Redirect to="/auth"/>
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
