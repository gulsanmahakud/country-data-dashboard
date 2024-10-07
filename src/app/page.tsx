'use client';

import React, { useState, useEffect } from 'react';
import { useCountries } from '../hooks/useCountries';
import CountryCard from './components/CountryCard';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import Loader from './components/Loader';
import CountryModal from './components/CountryModal'; // Import the modal
import { Country } from '../types/Country'; // Import the Country type
import DarkModeToggle from './components/DarkModeToggle'; // Import the DarkModeToggle
import RegionChart from './components/RegionChart'; // Import RegionChart

const Page = () => {
  const { data, error, isLoading } = useCountries();
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Get the user's preference from local storage
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      return savedMode === 'true';
    }
    return false;
  });

  useEffect(() => {
    // Apply dark mode class to the body
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading countries.</div>;

  const filteredCountries = data?.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter((country) =>
    region ? country.region === region : true
  );

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country); // Set the clicked country to state
  };

  const closeModal = () => {
    setSelectedCountry(null); // Reset the selected country to close the modal
  };

  return (
    <div className={`page ${isDarkMode ? 'dark-mode' : ''}`}>
      <h1>Country Dashboard</h1>
      <div className="controls">
        <SearchBar onSearch={setSearchTerm} />
        <Filter onFilter={setRegion} />
        <DarkModeToggle onToggle={setIsDarkMode} /> {/* Position toggle button here */}
      </div>

      {/* Add RegionChart Component */}
      <div className="chart-section">
        {data && (
          <RegionChart 
            countries={data} // Pass the country data to the chart
            isDarkMode={isDarkMode} // Pass the dark mode state
          />
        )}
      </div>

      <div className="grid">
        {filteredCountries?.map((country) => (
          <CountryCard 
            key={country.name.common} 
            country={country} 
            onClick={handleCountryClick} // Pass the click handler
          />
        ))}
      </div>

      {selectedCountry && ( // Conditional rendering of the modal
        <CountryModal 
          country={selectedCountry} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default Page;
