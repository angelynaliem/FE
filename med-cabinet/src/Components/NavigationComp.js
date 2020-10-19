import React from 'react';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';
import Registration from './Registration';
import StrainList from './StrainList';
import PrivateRoute from '../utils/PrivateRoute';
import Login from './Login';

const NewDiv = styled.div`
  height: 10vh;
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
        <NewNavLink to='/protected'>Strains List</NewNavLink>
      </NewDiv>
      <Route exact path='/Registration' component={Registration} />
      <Route exact path='/Login' component={Login} />
      <PrivateRoute path='/protected' component={StrainList} />
    </div>
  );
};

export default NavigationComp;
