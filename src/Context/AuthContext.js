// Context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    // Get the user data from local storage on initial load
    try {
      const storedData = localStorage.getItem('user');
      return storedData ? JSON.parse(storedData) : null;
    } catch {
      return null;
    }
  });

  const login = (data) => {
    // Save the user data in local storage
    localStorage.setItem('user', JSON.stringify(data));
    setAuthData(data);
  };

  const logout = (data) => {
    // Remove the user data from local storage and update state
    localStorage.removeItem('user');
    setAuthData(null);
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
