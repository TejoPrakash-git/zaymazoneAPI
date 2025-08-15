import User from '../models/User.js';

/**
 * Middleware to protect routes that require authentication
 * Verifies the token from the Authorization header
 * In a real app, this would use jsonwebtoken to verify
 */
export const protect = async (req, res, next) => {
  let token;

  // Check if token exists in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // In a real app, verify token with jwt.verify
      // For this demo, we'll extract the user ID from our simulated token
      const userId = token.split('-')[2];

      // Find user in MongoDB
      const user = await User.findById(userId).select('-password');

      if (!user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      // Set user in request object
      req.user = user;
      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

/**
 * Middleware to restrict access to specific user roles
 * @param {string[]} roles - Array of allowed roles
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, no user found' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Not authorized, insufficient permissions' });
    }

    next();
  };
};