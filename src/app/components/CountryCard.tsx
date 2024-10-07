'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Country } from '../../types/Country';

interface CountryCardProps {
  country: Country;
  onClick: (country: Country) => void; // Add onClick prop
}

const CountryCard: React.FC<CountryCardProps> = ({ country, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div 
      className={`country-card ${isVisible ? 'visible' : 'hidden'}`} 
      ref={ref} 
      onClick={() => onClick(country)} // Trigger the onClick with country data
      style={{ cursor: 'pointer' }} // Ensure cursor changes on hover
    >
      {isVisible ? (
        <div>
          <Image
            src={country.flags.png}
            alt={`${country.name.common} flag`}
            width={100}
            height={60}
            loading="lazy"
            className="country-flag"
          />
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital?.[0]}</p>
          <p>Population: {country.population.toLocaleString()}</p>
          <p>Region: {country.region}</p>
        </div>
      ) : (
        <div className="country-card-placeholder">Loading...</div>
      )}
    </div>
  );
};

export default CountryCard;
