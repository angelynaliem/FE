import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import PrivateRoute from './utils/PrivateRoute';
import NavigationComp from './Components/NavigationComp';
// import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Registration from './Components/Registration';
import styled from 'styled-components';


const NewDiv = styled.div`
  height: 50vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const NewNavLink = styled(Link)`
  font-size: 2.5rem;
  color: white;
  font-weight: 800;
  margin-top: 100px;
`;
const H1 = styled.div `
  color: white;
  font-size: 4rem;
  font-weight: 600;
  margin-top: 60px;

`;


const App = () => {
  return (
    
    <Router >
      <div className="App">
        <H1>BEST BUDS</H1>
        <Switch>
          <Route exact path='/'>
            
          <NewDiv>
        <NewNavLink to='/Login'>Login</NewNavLink>
        <NewNavLink to='/Registration'>Register</NewNavLink>
        
      </NewDiv>
          </Route>
          <Route path="/Login" component={Login} />
          <Route path="/Registration" component={Registration} />
          <PrivateRoute path='/protected' component={Dashboard}/>
        </Switch>
      </div>
    </Router>
    
    
    
    
  );
};
export default App;
