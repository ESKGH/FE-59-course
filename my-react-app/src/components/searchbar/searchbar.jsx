import React from 'react';
import "./styles.scss";

export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input className='searchbar-input'
      type="text"
      placeholder="Search movies..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
    />
  );
};

export default SearchBar;