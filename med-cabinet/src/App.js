import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import PrivateRoute from './utils/PrivateRoute';
import NavigationComp from './Components/NavigationComp';
// import Login from './Components/Login';
import StrainList from './Components/StrainList';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/'>
            <NavigationComp />
          </Route>
          <PrivateRoute path='/protected' component={StrainList} />
        </Switch>
      </div>
    </Router>
  );
};
export default App;
