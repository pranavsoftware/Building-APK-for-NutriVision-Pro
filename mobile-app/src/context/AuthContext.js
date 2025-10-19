import React, { createContext, useState, useEffect, useContext } from 'react';
import { getToken, clearStorage } from '../services/storage.service';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await getToken();
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = () => {
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    try {
      // Clear local storage
      await clearStorage();
      
      // Update state
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      // Even if sign out fails, clear local state
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        signIn,
        signOut,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
