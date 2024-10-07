'use client';

import React, { useState } from 'react';

interface FilterProps {
  onFilter: (region: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const region = event.target.value;
    setSelectedRegion(region);
    onFilter(region); // Trigger filter when selection changes
  };

  const handleReset = () => {
    setSelectedRegion(''); // Reset the selected region state
    onFilter(''); // Call onFilter with an empty string to reset the filter
  };

  return (
    <div className="filter">
      <select value={selectedRegion} onChange={handleSelectChange}>
        <option value="">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Filter;
