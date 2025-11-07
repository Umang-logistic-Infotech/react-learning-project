import React from 'react';
import { useTheme } from '../context/ThemeContextProvider';

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'} p-3`}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h1 className="m-0">React Training Tasks</h1>
        
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="themeSwitch"
            checked={theme === 'dark'}
            onChange={toggleTheme}
          />
          <label className={`form-check-label ${theme === 'dark' ? 'text-light' : 'text-dark'}`} htmlFor="themeSwitch">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </label>
        </div>
      </div>
    </header>
  );
}

export default Header;
