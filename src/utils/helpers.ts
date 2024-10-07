// utils/helpers.ts
import { Country } from '../types/Country';

export const sortCountriesByPopulation = (countries: Country[], ascending: boolean = true) => {
  return [...countries].sort((a, b) => (ascending ? a.population - b.population : b.population - a.population));
};

export const filterCountriesByRegion = (countries: Country[], region: string) => {
  if (!region) return countries;
  return countries.filter((country) => country.region.toLowerCase() === region.toLowerCase());
};

export const searchCountries = (countries: Country[], searchTerm: string) => {
  return countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (country.capital && country.capital.some((cap) => cap.toLowerCase().includes(searchTerm.toLowerCase())))
  );
};
