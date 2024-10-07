'use client';

import React, { useEffect, useState } from 'react';

interface DarkModeToggleProps {
  onToggle: (isDarkMode: boolean) => void; // Prop to set dark mode state
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ onToggle }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      return savedMode === 'true';
    }
    return false;
  });

  useEffect(() => {
    onToggle(isDarkMode); // Notify parent of the change
  }, [isDarkMode, onToggle]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <button onClick={toggleDarkMode} className="dark-mode-toggle">
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
