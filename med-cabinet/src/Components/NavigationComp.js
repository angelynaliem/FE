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
        <NewNavLink to='/login'>Login</NewNavLink>
        <NewNavLink to='/registration'>Registration</NewNavLink>
        <NewNavLink to='/strainList'>Strains List</NewNavLink>
      </NewDiv>
      <Route exact path='/registration' component={Registration} />
      <Route exact path='/strainList' component={StrainList} />
      {/* <PrivateRoute exact path='/strainList' component={StrainList} /> */}
      <Route exact path='/login' component={Login} />
    </div>
  );
};

export default NavigationComp;
