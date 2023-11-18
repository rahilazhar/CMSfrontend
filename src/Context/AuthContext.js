// Context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    // Get the user data from local storage on initial load
    try {
      const storedData = sessionStorage.getItem('user');
      return storedData ? JSON.parse(storedData) : null;
    } catch {
      return null;
    }
  });

  const login = (data) => {
    // Save the user data in local storage
    // .setItem('user', JSON.stringify(data));
    sessionStorage.setItem('user', JSON.stringify(data))
    setAuthData(data);
  };

  const logout = (data) => {
    // Remove the user data from local storage and update state
    sessionStorage.removeItem('user');
    setAuthData(null);
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
