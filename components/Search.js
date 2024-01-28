import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search for a breed"
        value={searchTerm}
        onChange={handleInputChange}
        className="p-2 border rounded-md"
      />
    </div>
  );
};

export default Search;