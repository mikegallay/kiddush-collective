'use client'; // Ensure this is client-side

import { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext'; // Adjust path as necessary

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//   };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? '🌞' : '🌜'}
    </button>
  );
};

export default ThemeToggle;
