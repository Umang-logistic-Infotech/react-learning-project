import  { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ name: '', loggedIn: false, access_token: '' });

  useEffect(() => {
    const raw = sessionStorage.getItem('userContext');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setUser(parsed);
      } catch (e) {
        console.error('Failed to parse userContext', e);
      }
    }
  }, []);
  useEffect(() => {
    if (user.loggedIn) {
      sessionStorage.setItem('userContext', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('userContext');
    }
  }, [user]);

  const logout = () => {
    setUser({ name: '', loggedIn: false, access_token: '' });
    sessionStorage.removeItem('userContext');
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
