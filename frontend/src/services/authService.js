import api from './api';

// User login
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data; // Contains token and user info
};

// User registration
export const register = async (userData) => {
  if(userData.role==='volunteer'){
    const response = await api.post('/volunteers/', userData);
    return response.data; // Contains newly registered user info
  }
  const response = await api.post('/auth/register', userData);
  return response.data; // Contains newly registered user info
};

// Get current user profile
export const getVolunteerProfile = async () => {
    // Get the auth token from localStorage
    const id = localStorage.getItem('userId');

    // Send token in Authorization header to the backend using api.get
    const response = await api.get(`/auth/volunteer/profile/${id}`);
    return response.data; // Contains volunteer profile info
};

export const getUserProfile = async () => {
  const id = localStorage.getItem('userId');
  const response = await api.get(`/auth/user/profile/${id}`);
  console.log(response);
  return response.data; // Contains user profile info
};

export const updateUserNotification = async (email, userData) => {
  const payload = { email, data: userData }; // Combine email and userData into a single object

  console.log("Payload being sent to server:", payload);

  const response = await api.post('/auth/volunteer/notifications', payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  return response.data; // Contains updated user profile info
};

// Logout user
export const logout = () => {
  localStorage.removeItem('authToken'); // Clear token
  window.location.href = '/login'; // Redirect to login page
};

export const getAllUsers = async () => {
  const authToken = localStorage.getItem('authToken'); // Get token from localStorage
  
  try {
    // Send the token in the Authorization header
    const response = await api.get('/auth/users', {
      headers: {
        Authorization: `Bearer ${authToken}` // Send token as Bearer token
      }
    });
    return response.data; // Contains all users
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Handle errors appropriately
  }
};

export const updateUserDetails = async (id,userData) => {
  const response = await api.post(`/auth/user/profile/${id}`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data; // Contains updated user profile info
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/auth/user/profile/${id}`);
  return response.data; // Contains message
};