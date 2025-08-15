import express from 'express';
import User from '../models/User.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

// Utility function to generate a simple token (in a real app, use jsonwebtoken)
const generateToken = (userId) => {
  return `simulated-jwt-token-${userId}-${Date.now()}`;
};

const router = express.Router();

/**
 * @route   GET /api/users/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/profile', protect, async (req, res) => {
  try {
    // req.user is set by the protect middleware
    res.json(req.user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Private
 */
router.get('/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/users/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // In a real app, you would compare hashed passwords here
    // For simplicity, we're just checking the plain text password
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    // Return user without password
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      location: user.location,
      totalSales: user.totalSales,
      rating: user.rating,
      token
    };
    
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/users
 * @desc    Register a new user
 * @access  Public
 */
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const user = await User.create(req.body);
    
    // Generate token
    const token = generateToken(user._id);
    
    // Return user without password
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      location: user.location,
      totalSales: user.totalSales,
      rating: user.rating,
      token
    };
    
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   PUT /api/users/:id
 * @desc    Update user profile
 * @access  Private
 */
router.put('/:id', protect, async (req, res) => {
  try {
    // Check if user is updating their own profile
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Handle password update if provided
    if (req.body.currentPassword && req.body.password) {
      // In a real app, you would use bcrypt.compare here
      if (req.body.currentPassword !== user.password) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }
    }
    
    // Prepare updates
    const updates = {};
    if (req.body.password) updates.password = req.body.password;
    if (req.body.name) updates.name = req.body.name;
    if (req.body.avatar) updates.avatar = req.body.avatar;
    if (req.body.location) updates.location = req.body.location;
    
    // Update user in database
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    ).select('-password');
    
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/users/artisans
 * @desc    Get all artisans
 * @access  Public
 */
router.get('/artisans/all', async (req, res) => {
  try {
    const artisans = await User.find({ role: 'artisan' }).select('-password');
    res.json(artisans);
  } catch (error) {
    console.error('Error fetching artisans:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/users/top-artisans
 * @desc    Get top rated artisans
 * @access  Public
 */
router.get('/top-artisans/list', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    
    const artisans = await User.find({ role: 'artisan' })
      .sort({ rating: -1, totalSales: -1 })
      .limit(limit)
      .select('-password');
    
    res.json(artisans);
  } catch (error) {
    console.error('Error fetching top artisans:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;