import React from 'react';

const FilterPanel = ({ filters, toggleFilter, searchQuery, handleSearchChange }) => (
  <div className="w-52 p-4 bg-gray-800 text-white">
    <h3 className="text-lg font-bold mb-2">Filters</h3>
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
    <h3 className="text-lg font-bold mt-4 mb-2">Search</h3>
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearchChange}
      placeholder="Search nodes..."
      className="w-full p-2 bg-gray-700 text-white rounded"
    />
  </div>
);

export default FilterPanel;
