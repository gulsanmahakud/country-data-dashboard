import { useQuery } from 'react-query';
import { Country } from '../types/Country';
import axios from 'axios';

const fetchCountries = async () => {
  const { data } = await axios.get<Country[]>('https://restcountries.com/v3.1/all');
  return data;
};

export const useCountries = () => {
  return useQuery('countries', fetchCountries, {
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    refetchOnWindowFocus: false,
  });
};
