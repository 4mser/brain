import React from 'react';

const SearchInput = ({ searchQuery, handleSearchChange }) => (
  <div className="flex-1">
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearchChange}
      placeholder="Search nodes..."
      className="w-full p-2 bg-gray-800 text-white rounded"
    />
  </div>
);

const FilterCheckbox = ({ label, checked, onChange }) => (
  <label className="flex items-center">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="mr-2"
    />
    {label}
  </label>
);

export { SearchInput, FilterCheckbox };
