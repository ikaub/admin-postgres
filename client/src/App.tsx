import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.scss';
import { Auth } from './pages/Auth/Auth';
import { User } from './pages/User/User';
import { Header } from './components/Header/Header';
import { CreateProfile } from './pages/CreateProfile/CreateProfile';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
  headers: localStorage.getItem('user') ? {
    authorization: `Bearer ${JSON.parse(localStorage.getItem('user') as string).token}` || '',
  } : undefined,
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
