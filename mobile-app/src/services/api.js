import axios from 'axios';
import { API_BASE_URL, TIMEOUTS } from '../utils/constants';
import { getToken } from './storage.service';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUTS.API_REQUEST,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log('API Error:', error.message);
    
    if (error.response) {
      // Server responded with error
      const errorMessage = error.response.data?.error || error.response.data?.message || 'An error occurred';
      console.log('Server Error:', errorMessage);
      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      // Request made but no response
      console.log('Network Error: No response received from server');
      console.log('Make sure backend is running and API_BASE_URL is correct');
      console.log('Current API_BASE_URL:', API_BASE_URL);
      return Promise.reject(new Error('Cannot connect to server. Please check:\n1. Backend server is running\n2. You are using correct IP address\n3. Phone and computer are on same network'));
    } else {
      // Something else happened
      console.log('Request Error:', error.message);
      return Promise.reject(new Error(error.message || 'An error occurred'));
    }
  }
);

export default api;
