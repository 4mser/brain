import React from 'react';

const SearchInput = ({ searchQuery, handleSearchChange }) => (
  <div className="flex-1 relative">
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearchChange}
      placeholder="Search nodes..."
      className="w-full p-2 pl-7 bg-gray-800 text-white rounded"
    />
    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
      <img src="/assets/icons/search.svg" alt="Search" className="h-5 w-5" />
    </div>
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

const FilterSwitch = ({ label, checked, onChange }) => (
    <div className="flex items-center justify-between mb-2">
      <span>{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate-500"></div>
      </label>
    </div>
  );

export { SearchInput, FilterCheckbox, FilterSwitch };
