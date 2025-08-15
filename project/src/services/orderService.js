import api from './api';

/**
 * Create a new order
 * @param {Object} orderData - Order data
 * @returns {Promise<Object>} - Created order
 */
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

/**
 * Get order by ID
 * @param {String} id - Order ID
 * @returns {Promise<Object>} - Order object
 */
export const getOrderById = async (id) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

/**
 * Get orders by user
 * @param {String} userId - User ID
 * @returns {Promise<Array>} - Array of orders
 */
export const getOrdersByUser = async (userId) => {
  try {
    const response = await api.get(`/orders/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};

/**
 * Get orders by seller
 * @param {String} sellerId - Seller ID
 * @returns {Promise<Array>} - Array of orders
 */
export const getOrdersBySeller = async (sellerId) => {
  try {
    const response = await api.get(`/orders/seller/${sellerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching seller orders:', error);
    throw error;
  }
};

/**
 * Get recent orders by seller
 * @param {String} sellerId - Seller ID
 * @param {Number} limit - Number of orders to return
 * @returns {Promise<Array>} - Array of recent orders
 */
export const getRecentOrdersBySeller = async (sellerId, limit = 5) => {
  try {
    const response = await api.get(`/orders/seller/${sellerId}/recent`, { params: { limit } });
    return response.data;
  } catch (error) {
    console.error('Error fetching recent seller orders:', error);
    throw error;
  }
};

/**
 * Update order status
 * @param {String} id - Order ID
 * @param {String} status - New status
 * @returns {Promise<Object>} - Updated order
 */
export const updateOrderStatus = async (id, status) => {
  try {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};