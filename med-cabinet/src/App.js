import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import PrivateRoute from './utils/PrivateRoute';
// import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Registration from './Components/Registration';
import styled from 'styled-components';
import StrainList from './Components/StrainList';


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
const IMG = styled.img `
width: 100%;
height: 250px;
opacity: .8;

`

const App = () => {
  return (
    
    <Router >
      <div className="App">
       
        <IMG src="https://raw.githubusercontent.com/Build-Week-PT-Med-Cabinet-2/DS/main/medcab%20light%20banner.jpg"/>
        <Switch>
          <Route exact path='/'>
            
          <NewDiv>
        <NewNavLink to='/Login'>Login</NewNavLink>
        <NewNavLink to='/Registration'>Register</NewNavLink>
        
      </NewDiv>
          </Route>
          <Route path="/Login" component={Login} />
          <Route path="/Registration" component={Registration} />
          <PrivateRoute path="/Strainslist" component={StrainList} />
          <PrivateRoute path='/protected' component={Dashboard}/>
        </Switch>
      </div>
    </Router>
    
    
    
    
  );
};
export default App;
