import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { apiRequest } from '../api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const handleAuthResponse = (data) => {
    const { access_token } = data;
    if (access_token) {
      setToken(access_token);
      localStorage.setItem('authToken', access_token);
      setError(null);
      window.location.hash = '#/dashboard'; // Redirect on login
    } else {
      throw new Error("Login failed: No access token received.");
    }
  };

  const login = async (email, password) => {
    try {
      const data = await apiRequest('/auth/login', 'POST', { email, password }, null);
      handleAuthResponse(data);
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw for form handling
    }
  };

  const register = async (formData) => {
    try {
      // After registering, automatically log the user in
      await apiRequest('/auth/register', 'POST', formData, null);
      await login(formData.email, formData.password);
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw for form handling
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
    window.location.hash = '#/'; // Redirect to landing page on logout
  };

  const authValue = useMemo(() => ({
    token,
    loading,
    error,
    login,
    register,
    logout,
    clearError: () => setError(null)
  }), [token, loading, error]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};