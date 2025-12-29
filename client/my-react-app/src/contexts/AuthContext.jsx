import { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getCurrentUser } from '../api/authApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      
      if (storedToken) {
        try {
          const userData = await getCurrentUser();
          setUser(userData.data.user);
          setToken(storedToken);
        } catch (error) {
          console.error('Auth initialization failed:', error);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const response = await loginUser(email, password);
    const { user: userData, token: userToken } = response.data;
    
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('token', userToken);
    
    return response;
  };

  const register = async (username, email, password) => {
    const response = await registerUser(username, email, password);
    const { user: userData, token: userToken } = response.data;
    
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('token', userToken);
    
    return response;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};