import React from 'react';
import { FilterCheckbox, FilterSwitch } from './SearchAndFilter';

const FilterPanel = ({ filters, toggleFilter }) => {
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
    <div className=" bg-gradient-to-b from-gray-900 to-neutral-950 text-white p-6 rounded-b-3xl shadow-lg border border-white/10 max-h-[80vh] overflow-y-auto w-full">
      <h3 className="text-lg font-bold mb-4">Filters</h3>
      <div className="space-y-3 text-white/70 ">
        {filterOptions.map((option) => (
          <FilterSwitch
            key={option.filter}
            label={option.label}
            checked={filters[option.filter]}
            onChange={() => toggleFilter(option.filter)}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
