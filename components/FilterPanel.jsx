import React from 'react';
import { FilterCheckbox } from './SearchAndFilter';

const FilterPanel = ({ filters, toggleFilter, isOpen, toggleMenu }) => {

  const filterOptions = [
    { label: 'Show All', filter: 'all' },
    { label: 'Departments', filter: 'department' },
    { label: 'Managers', filter: 'manager' },
    { label: 'Subnodes', filter: 'subnode' },
    { label: 'Workers', filter: 'worker' },
    { label: 'Teams', filter: 'team' },
    { label: 'Interns', filter: 'intern' },
  ];

  return (
    <div>
      {/* Background overlay to close the menu when clicking outside */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/80 z-40 ${isOpen ? 'block' : 'hidden'}`}
        onClick={toggleMenu}
      ></div>

      {/* Filter panel */}
      <div
        className={`absolute z-50 w-52 p-4 bg-gradient-to-b from-gray-900 to-neutral-950 text-white m-5 shadow-xl rounded-xl max-h-[100dvh] border border-white/10 h-fit ${isOpen ? 'block' : 'hidden'}`}
      >
        <h3 className="text-lg font-bold mb-2">Filters</h3>
        <div className="space-y-2">
          {filterOptions.map((option) => (
            <FilterCheckbox
              key={option.filter}
              label={option.label}
              checked={filters[option.filter]}
              onChange={() => toggleFilter(option.filter)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
