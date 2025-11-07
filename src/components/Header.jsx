import React, { useContext } from 'react';
import { useTheme } from '../context/ThemeContextProvider';
import {  Dropdown } from 'react-bootstrap';
import { UserContext } from '../context/UserContextProvider';
import { Link } from 'react-router-dom';

function Header() {
  const { theme, toggleTheme } = useTheme();
    // const { user.loggedIn } = UserContext();
  const { user } = useContext(UserContext);
  console.log(user.loggedIn);
  return (
    // {user && 
    <header className={`${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'} p-3`}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h1 className="m-0">React Training Tasks</h1>

        <div className="d-flex align-items-center">
          <div className="form-check form-switch me-3">
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
          {user.loggedIn ? (
            <Dropdown>
              <Dropdown.Toggle
                variant={theme === 'dark' ? 'secondary' : 'primary'}
                id="profile-dropdown"
              >
                Profile
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item  to="/profile">My Profile</Dropdown.Item>
                <Dropdown.Item  to="/settings">Settings</Dropdown.Item>
                {/* <Dropdown.Item onClick={() => setUser({ loggedIn: false })}>Logout</Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div className="d-flex gap-2">
              <Link
                to="/login"
                className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'}`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'}`}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
    // }
  );
}

export default Header;
