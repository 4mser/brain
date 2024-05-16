import React from 'react';

const SearchInput = ({ searchQuery, handleSearchChange }) => (
  <div>
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearchChange}
      placeholder="Search nodes..."
      className="absolute z-50 right-0  m-5 px-3 py-2 border border-white/10 bg-gray-800 text-white rounded-full"
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
