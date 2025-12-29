import axios from './axios';

export const registerUser = async (username, email, password) => {
  const response = await axios.post('/auth/register', {
    username,
    email,
    password
  });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axios.post('/auth/login', {
    email,
    password
  });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get('/auth/me');
  return response.data;
};