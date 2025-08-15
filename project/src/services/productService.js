import api from './api';

/**
 * Get all products with optional filtering
 * @param {Object} filters - Optional filters for products
 * @returns {Promise<Array>} - Array of products
 */
export const getProducts = async (filters = {}) => {
  try {
    const response = await api.get('/products', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Get a single product by ID
 * @param {String} id - Product ID
 * @returns {Promise<Object>} - Product object
 */
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

/**
 * Get products by artisan (seller)
 * @param {String} artisanId - Artisan/Seller user ID
 * @returns {Promise<Array>} - Array of products
 */
export const getProductsByArtisan = async (artisanId) => {
  try {
    const response = await api.get(`/products/artisan/${artisanId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching artisan products:', error);
    throw error;
  }
};

/**
 * Create a new product
 * @param {Object} productData - Product data
 * @returns {Promise<Object>} - Created product
 */
export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

/**
 * Update a product
 * @param {String} id - Product ID
 * @param {Object} productData - Updated product data
 * @returns {Promise<Object>} - Updated product
 */
export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

/**
 * Delete a product
 * @param {String} id - Product ID
 * @returns {Promise<Object>} - Deleted product
 */
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};