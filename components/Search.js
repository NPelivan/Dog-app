import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <div className="mb-4 lg:mb-8">
      <input
        type="text"
        placeholder="Search for a breed"
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full pl-7 p-2 bg-transparent border-b border-gray-500 focus:outline-none "
    />
    </div>
  );
};

export default Search;