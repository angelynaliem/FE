import React, { useState } from 'react';

const SearchForm = (props) => {
  const [query, setQuery] = useState();

  const handleChange = (event) => {
    setQuery(event.target.value);
    console.log(query);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(query);
    props.setDataStrain(
      props.dataStrain.filter((element) =>
        element.Type.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='search'>
          Search: By Strain type
          <input
            onChange={handleChange}
            type='text'
            id='search'
            name='search'
            placeholder='Search'
          />
        </label>
        <button type='submit'>Sort by Type:</button>
      </form>
    </div>
  );
};

export default SearchForm;
