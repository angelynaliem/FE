import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const SavedStrain = ({list}) => {
    return ( 
        <div >
        <h3>Saved Strains:</h3>
        {list.map(strain => {
          return (
            <NavLink
              to={`/strains/${strain.id}`}
              key={strain.id}
              
            >
              <span className="saved-movie">{strain.Strain}</span>
            </NavLink>
          );
        })}
        <div className="home-button">
          <Link to="/">Home</Link>
        </div>
      </div>
     );
}
 
export default SavedStrain;

//still working