import React from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import ServiceAdd from './components/ServiceAdd';
import ServiceList from './components/ServiceList';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/services" />
        </Route>
        <Route exact path="/services" component={ServiceList} />
        <Route exact path="/services/:id" component={ServiceAdd} />
      </Switch>
    </Router>
  );
}

export default App;
