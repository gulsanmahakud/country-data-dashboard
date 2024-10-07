'use client';

import React from 'react';
import Image from 'next/image';
import { Country } from '../../types/Country';

interface CountryModalProps {
  country: Country | null; // The selected country or null
  onClose: () => void; // Function to close the modal
}

const CountryModal: React.FC<CountryModalProps> = ({ country, onClose }) => {
  if (!country) return null; // Don't render if there's no country

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">Close</button>
        <h2>{country.name.common}</h2>
        <Image src={country.flags.png} alt={`${country.name.common} flag`} width={100} height={60} />
        <p>Capital: {country.capital?.[0]}</p>
        <p>Population: {country.population.toLocaleString()}</p>
        <p>Region: {country.region}</p>
        <p>Currencies: {country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
        <p>Languages: {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
        <p>Time Zones: {country.timezones.join(', ')}</p>
      </div>
    </div>
  );
};

export default CountryModal;
