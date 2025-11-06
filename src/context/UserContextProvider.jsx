import { createContext, useState } from 'react';
import React from 'react';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({ name: 'Default', loggedIn: false });
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;