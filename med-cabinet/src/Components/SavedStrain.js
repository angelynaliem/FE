import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const SavedStrain = ({list}) => {
    return ( 
        <div >
        <h3>Saved Strains:</h3>
        <div className="home-button">
          <Link to="/">Home</Link>
        </div>
      </div>
     );
}
 
export default SavedStrain;

//still working