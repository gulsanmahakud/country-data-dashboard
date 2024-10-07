'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Country } from '../../types/Country';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface RegionChartProps {
  countries: Country[];
  isDarkMode: boolean; // Add isDarkMode prop
}

const RegionChart: React.FC<RegionChartProps> = ({ countries, isDarkMode }) => {
  // Group countries by region
  const regionCounts: { [key: string]: number } = {};

  countries.forEach(country => {
    const region = country.region || 'Unknown'; // Fallback to "Unknown" if region is not defined
    if (!regionCounts[region]) {
      regionCounts[region] = 0;
    }
    regionCounts[region]++;
  });

  const regions = Object.keys(regionCounts);
  const counts = Object.values(regionCounts);

  const data = {
    labels: regions,
    datasets: [
      {
        label: 'Number of Countries',
        data: counts,
        backgroundColor: isDarkMode ? 'rgba(75, 192, 192, 0.8)' : 'rgba(75, 192, 192, 0.6)', // Adjust colors based on dark mode
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Number of Countries by Region',
      },
    },
  };

  return (
    <div className={`chart-container ${isDarkMode ? 'dark-mode' : ''}`}> {/* Apply dark mode class */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default RegionChart;
