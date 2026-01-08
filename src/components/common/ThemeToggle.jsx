import React from 'react';

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      className="btn btn-sm btn-outline-secondary theme-toggle"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}
