import api from './api';

/**
 * Get user by ID
 * @param {String} id - User ID
 * @returns {Promise<Object>} - User object
 */
export const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
/**
 * Get user by ID
 * @param {String} id - User ID
 * @returns {Promise<Object>} - User object
 */
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

/**
 * Get current user profile
 * @returns {Promise<Object>} - Current user profile
 */
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

/**
 * Login user
 * @param {Object} credentials - User credentials (email, password)
 * @returns {Promise<Object>} - User object with token
 */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    // Store token in localStorage for API interceptor
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

/**
 * Register a new user
 * @param {Object} userData - User data
 * @returns {Promise<Object>} - Created user with token
 */
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    // Store token in localStorage for API interceptor
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

/**
 * Update user
 * @param {String} id - User ID
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>} - Updated user
 */
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};