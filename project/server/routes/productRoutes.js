import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Get all products with optional filtering
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, rating, search, sortBy } = req.query;
    
    const query = {};
    
    // Apply filters if provided
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (minPrice && maxPrice) {
      query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    }
    
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    // Get products with applied filters
    const products = await Product.find(query).sort(getSortOption(sortBy));
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/products/:id
 * @desc    Get a single product by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/products/artisan/:artisanId
 * @desc    Get products by artisan (seller)
 * @access  Public
 */
router.get('/artisan/:artisanId', async (req, res) => {
  try {
    const products = await Product.find({ artisanId: req.params.artisanId });
    res.json(products);
  } catch (error) {
    console.error('Error fetching artisan products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private/Seller
 */
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product
 * @access  Private/Seller
 */
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 * @access  Private/Seller
 */
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * Helper function to get sort option based on sortBy parameter
 * @param {String} sortBy - Sort option
 * @returns {Object} - Sort object for MongoDB
 */
const getSortOption = (sortBy) => {
  switch (sortBy) {
    case 'price-low-to-high':
      return { price: 1 };
    case 'price-high-to-low':
      return { price: -1 };
    case 'newest':
      return { createdAt: -1 };
    case 'rating':
      return { rating: -1 };
    default:
      return { createdAt: -1 };
  }
};

export default router;