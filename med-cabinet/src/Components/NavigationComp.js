import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import styled from 'styled-components';
import Registration from './Registration';
import StrainList from './StrainList';

const NewDiv = styled.div`
  height: 10vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const NewNavLink = styled(NavLink)`
  color: Black;
  font-size: 2rem;
`;

const NavigationComp = () => {
  return (
    <div>
      <NewDiv>
        <NewNavLink to='/Registration'>Registration</NewNavLink>
        <NewNavLink to='/StrainList'>Strains List</NewNavLink>
        <NewNavLink to='/IndividualStrainPage'>Indivdual Strain</NewNavLink>
      </NewDiv>
      <Route exact path='/Registration' component={Registration} />
      <Route exact path='/StrainList' component={StrainList} />
    </div>
  );
};

export default NavigationComp;
