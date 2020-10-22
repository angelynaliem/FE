import React, { useState } from 'react';
import Data from '../Data/csvjson.json';
import styled from 'styled-components';
import SearchForm from '../Forms/SearchFormm';

const NewDiv = styled.div`
  width: 30%;
  border: 1px solid black;
  margin: 1%;
`;

const StrainWrapperDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StrainList = () => {
  const [dataStrain, setDataStrain] = useState(Data);

  return (
    <div>
      <SearchForm dataStrain={dataStrain} setDataStrain={setDataStrain} />
      <StrainWrapperDiv>
        {dataStrain.map((element, i) => (
          <NewDiv key={i}>
            <h1>Strain: {element.Strain}</h1>
            <h2>Type: {element.Type}</h2>
            <h3>Rating: {element.Rating}</h3>
            <h4>Effects: {element.Effects}</h4>
            <h5>Flavors: {element.Flavor}</h5>
            <h6>Description: {element.Description}</h6>
            <button>Save Strain</button>
          </NewDiv>
        ))}
      </StrainWrapperDiv>
    </div>
  );
};

export default StrainList;
