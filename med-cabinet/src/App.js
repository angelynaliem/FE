import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StrainList from './Components/StrainList';
import Login from './Components/Login.js';
import './App.css';
import PrivateRoute from './utils/PrivateRoute';

function App () {
  
  return (
    <Router>
    <div className="App">
      <Switch>
      <Route exact path="/login" component={Login} />
     <PrivateRoute path="/protected" component={StrainList}/>
     </Switch>
    </div>
    </Router>
  );
}

export default App;
