'use client';

import React from 'react';
import { Country } from '../../../types/Country';
import { useCountries } from '../../../hooks/useCountries';

const CountryDetailPage = ({ params }: { params: { name: string } }) => {
  const { data: countries } = useCountries();
  const country = countries?.find((c) => c.name.common === params.name);

  if (!country) return <div>Country not found.</div>;

  return (
    <div>
      <h1>{country.name.official}</h1>
      <img src={country.flags.png} alt={`${country.name.official} flag`} />
      <p>Capital: {country.capital[0]}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Region: {country.region}</p>
      <p>Languages: {Object.values(country.languages).map(lang => lang.name).join(', ')}</p>
      <p>Currencies: {Object.values(country.currencies).map(curr => `${curr.name} (${curr.symbol})`).join(', ')}</p>
      <p>Time Zones: {country.timezones.join(', ')}</p>
    </div>
  );
};

export default CountryDetailPage;
