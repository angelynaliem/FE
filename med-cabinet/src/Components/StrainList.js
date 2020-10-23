import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const StrainList = () => {
  const [strainsList, setStrainsList] = useState([]);

  const getStrainList = () =>{
    axios
      .get('https://strains-cannabis.herokuapp.com/strains')
      .then(res => setStrainsList(res.data))
      .catch(err=> console.log(err.res));
      console.log(strainsList);
  }
  return ( 
    <div>
      <h1>Strains</h1>
    </div>
   );
}
 
export default StrainList;



