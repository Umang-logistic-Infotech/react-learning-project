import React, { createContext, useState, useEffect } from 'react';

// Create context
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'Default', loggedIn: false });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ name: 'Default', loggedIn: true });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
