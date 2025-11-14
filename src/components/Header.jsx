import React, { useContext } from 'react';
import { useTheme } from '../context/ThemeContextProvider';
import { Dropdown } from 'react-bootstrap';
import { UserContext } from '../context/UserContextProvider';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const navItems = [
    { path: '/labs', label: 'Labs' },
    { path: '/textfield', label: 'TextField' },
    { path: '/select', label: 'Select' },
    { path: '/checkbox', label: 'CheckBox' },
    { path: '/radio', label: 'Radio' },
  ];

  function handleLogout() {
    sessionStorage.removeItem('userContext');
      toast.info("Logout successful",{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
      });
    navigate('/'); 
  }

  const renderLink = (path, label) => (
    <Link 
      className="nav-link rounded"
      to={path}
      style={{
        transition: 'all 0.3s',
        padding: '0.75rem 1rem'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {label}
    </Link>
  );

  return (
    <header className={`${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'} p-3`}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h1 className="m-0">React Training Tasks</h1>

        <div className="d-flex gap-3">
          {navItems.map(item => renderLink(item.path, item.label))}
        </div>

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
                <Dropdown.Item as={Link} to="/profile">My Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
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
  );
}

export default Header;
