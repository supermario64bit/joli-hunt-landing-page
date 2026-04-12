import React, { createContext, useState, useEffect, useContext } from 'react';
import { authAPI, formatApiErrorDetail } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // null = checking, user object = authenticated, false = not authenticated
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await authAPI.getMe();
      setUser(userData);
    } catch (error) {
      setUser(false); // Not authenticated
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const userData = await authAPI.login(email, password);
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      const errorMsg = formatApiErrorDetail(error.response?.data?.detail) || error.message;
      return { success: false, error: errorMsg };
    }
  };

  const register = async (email, password, name) => {
    try {
      const userData = await authAPI.register(email, password, name);
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      const errorMsg = formatApiErrorDetail(error.response?.data?.detail) || error.message;
      return { success: false, error: errorMsg };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setUser(false);
      return { success: true };
    } catch (error) {
      // Logout locally even if API fails
      setUser(false);
      return { success: true };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    checkAuth,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
