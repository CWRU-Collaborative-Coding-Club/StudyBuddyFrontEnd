// app/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { router } from 'expo-router';

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the provider
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Perform login logic
    setIsAuthenticated(true);
    // Redirect to the main app on successful login
    router.replace('/');
  };

  const logout = () => {
    // Perform logout logic
    setIsAuthenticated(false);
    // Redirect to the login page on logout
    router.replace('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Custom hook for easier access
export const useAuth = () => useContext(AuthContext);

// NOTE: This file is a utility/context, NOT a route, but if you keep it 
// in 'app/context/', you must use solution #2 from the previous response.