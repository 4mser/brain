import React, { useState } from 'react';

const FilterPanel = ({ filters, toggleFilter, searchQuery, handleSearchChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className="md:hidden fixed top-5 left-5 z-50 p-2 bg-neutral-950 text-white rounded-full"
        onClick={toggleMenu}
      >
        {isOpen ? 'Close Menu' : 'Open Menu'}
      </button>
      <div className={`fixed top-0 left-0 w-full h-full bg-black/50 z-40 ${isOpen ? 'block' : 'hidden'} md:hidden`} onClick={toggleMenu}></div>
      <div className={`absolute z-50 w-52 p-4 bg-neutral-950 text-white m-5 rounded-xl max-h-[100dvh] border border-white/10 h-fit ${isOpen ? 'block' : 'hidden'} md:block`}>
        <h3 className="text-lg font-bold mb-2">Search</h3>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search nodes..."
          className="w-full p-2 bg-neutral-800 text-white rounded"
        />
        <h3 className="text-lg font-bold mt-4 mb-2">Filters</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.all}
              onChange={() => toggleFilter('all')}
              className="mr-2"
            />
            Show All
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.department}
              onChange={() => toggleFilter('department')}
              className="mr-2"
            />
            Departments
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.manager}
              onChange={() => toggleFilter('manager')}
              className="mr-2"
            />
            Managers
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.subnode}
              onChange={() => toggleFilter('subnode')}
              className="mr-2"
            />
            Subnodes
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.worker}
              onChange={() => toggleFilter('worker')}
              className="mr-2"
            />
            Workers
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.team}
              onChange={() => toggleFilter('team')}
              className="mr-2"
            />
            Teams
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.intern}
              onChange={() => toggleFilter('intern')}
              className="mr-2"
            />
            Interns
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
