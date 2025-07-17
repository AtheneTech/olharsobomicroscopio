import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/users/login', { email, password });
      const { token: newToken, user: userData } = response.data;

      localStorage.setItem('authToken', newToken);
      setToken(newToken);
      setUser(userData);
      api.defaults.headers.Authorization = `Bearer ${newToken}`;

      navigate('/admin'); 
    } catch (error) {
      console.error("Erro no login:", error.response?.data?.error || error.message);
      throw new Error(error.response?.data?.error || "Falha no login");
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
    delete api.defaults.headers.Authorization;
    
    navigate('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};