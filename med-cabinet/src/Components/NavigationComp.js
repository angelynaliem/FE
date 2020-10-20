import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Registration from './Registration';
import StrainList from './StrainList';
import PrivateRoute from '../utils/PrivateRoute';
import Login from './Login';
import Dashboard from './Dashboard';

const NewDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const NewNavLink = styled(Link)`
  color: Black;
  font-size: 2rem;
`;

const NavigationComp = () => {
  return (
    <div>
      <NewDiv>
        <NewNavLink to='/Login'>Login</NewNavLink>
        <NewNavLink to='/Registration'>Registration</NewNavLink>
        
      </NewDiv>
      <Switch>
      <Route  path='/Registration' component={Registration} />
      <Route path='/Login' component={Login} />
      <Route path='/protected' component={Dashboard}/>
      </Switch>
    </div>
  );
};

export default NavigationComp;
