import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Series from './pages/Series';
import Genres from './pages/Genres';

import Header from './components/Header';

const Routes = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/series" component={Series} />
        <Route path="/genres" component={Genres} />
      </Switch>
    </Router>
  );
};

export default Routes;
