import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import PrivateRoute from './utils/PrivateRoute';
// import Login from './Components/Login';
import StrainDetails from './Components/StrainDetails';
import Registration from './Components/Registration';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/Registration' component={Registration} />
          <Route path='/Straindetails'>
            <StrainDetails />
          </Route>
          {/* <PrivateRoute path='/protected' component={StrainList} /> */}
        </Switch>
      </div>
    </Router>
  );
};
export default App;
