import React from 'react';
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
