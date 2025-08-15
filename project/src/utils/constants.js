// Application constants and configuration
export const APP_NAME = 'Zaymazone';
export const APP_DESCRIPTION = 'Artisan Marketplace for Handcrafted Treasures';

// API endpoints (for future backend integration)
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.zaymazone.com' 
  : 'http://localhost:5000';

export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    signup: '/api/auth/signup',
    logout: '/api/auth/logout',
    profile: '/api/auth/profile',
  },
  products: {
    list: '/api/products',
    detail: (id) => `/api/products/${id}`,
    create: '/api/products',
    update: (id) => `/api/products/${id}`,
    delete: (id) => `/api/products/${id}`,
  },
  orders: {
    list: '/api/orders',
    create: '/api/orders',
    detail: (id) => `/api/orders/${id}`,
  },
  payments: {
    create: '/api/payments',
    verify: '/api/payments/verify',
  }
};

// Product categories
export const PRODUCT_CATEGORIES = [
  { value: 'home-decor', label: 'Home Decor' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'art', label: 'Art' },
  { value: 'textiles', label: 'Textiles' },
  { value: 'pottery', label: 'Pottery' },
  { value: 'woodwork', label: 'Woodwork' },
];

// Order status options
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// User roles
export const USER_ROLES = {
  BUYER: 'buyer',
  SELLER: 'seller',
  ADMIN: 'admin',
};

// Pagination
export const ITEMS_PER_PAGE = 12;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'zaymazone_auth_token',
  CART: 'zaymazone_cart',
  FAVORITES: 'zaymazone_favorites',
  USER_PREFERENCES: 'zaymazone_preferences',
};

// Animation configurations
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};

// Form validation rules
export const VALIDATION_RULES = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  password: {
    minLength: 6,
    message: 'Password must be at least 6 characters long',
  },
  phone: {
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    message: 'Please enter a valid phone number',
  },
  zipCode: {
    pattern: /^\d{5}(-\d{4})?$/,
    message: 'Please enter a valid ZIP code',
  },
};

// Currency formatter
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Date formatter
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

// Image placeholder URLs (for development)
export const PLACEHOLDER_IMAGES = {
  product: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
  banner: 'https://images.pexels.com/photos/1827054/pexels-photo-1827054.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&dpr=1',
};