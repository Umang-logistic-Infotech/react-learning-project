import React, { useContext } from 'react';
// import { UserContext } from '../context/UserContextProvider';
import { useTheme } from '../context/ThemeContextProvider';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const { theme } = useTheme();
  // const { user } = useContext(UserContext);
  const location = useLocation();

  const navItems = [
    { path: '/Program1', label: 'Program 1' },
    { path: '/Program2', label: 'Program 2' },
    { path: '/Program3', label: 'Program 3' },
    { path: '/Program4', label: 'Program 4' },
    { path: '/Program5', label: 'Program 5' },
    { path: '/Program6', label: 'Program 6' },
    { path: '/Program7', label: 'Program 7' },
    { path: '/Program8', label: 'Program 8' },
    { path: '/Program9', label: 'Program 9' },
    { path: '/TheMovieDB', label: 'The Movie DB' },
  ];

  return (
    <aside 
      className={`${theme === 'dark' ? 'bg-dark text-light border-end border-secondary' : 'bg-light text-dark border-end'} p-4`} 
      style={{ 
        width: '250px', 
        minHeight: '100vh',
        position: 'sticky',
        top: 0,
        overflowY: 'auto'
      }}
    >
      <nav>
        <ul className="nav flex-column">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path} className="nav-item mb-1">
                <Link 
                  className={`nav-link rounded ${
                    isActive 
                      ? theme === 'dark' 
                        ? 'bg-primary text-white' 
                        : 'bg-primary text-white'
                      : theme === 'dark' 
                        ? 'text-light' 
                        : 'text-dark'
                  }`}
                  to={item.path}
                  style={{
                    transition: 'all 0.3s',
                    padding: '0.75rem 1rem'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;