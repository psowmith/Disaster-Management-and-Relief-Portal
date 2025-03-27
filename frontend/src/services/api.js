import axios from 'axios';
// Create an axios instance with a base URL and default settings
const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for attaching tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Retrieve token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle token expiration or other errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken'); // Clear token if unauthorized
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
