import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

/**
 * @route   POST /api/orders
 * @desc    Create a new order
 * @access  Private
 */
router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/orders/:id
 * @desc    Get order by ID
 * @access  Private
 */
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/orders/user/:userId
 * @desc    Get orders by user ID
 * @access  Private
 */
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/orders/seller/:sellerId
 * @desc    Get orders by seller ID
 * @access  Private/Seller
 */
router.get('/seller/:sellerId', async (req, res) => {
  try {
    // Find orders where any item has the seller ID as artisan
    const orders = await Order.find({
      'orderItems.artisan': req.params.sellerId
    }).sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching seller orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/orders/recent/:sellerId
 * @desc    Get recent orders by seller ID (limited)
 * @access  Private/Seller
 */
router.get('/recent/:sellerId', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    
    // Find recent orders where any item has the seller ID as artisan
    const orders = await Order.find({
      'orderItems.artisan': req.params.sellerId
    })
      .sort({ createdAt: -1 })
      .limit(limit);
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching recent seller orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   PUT /api/orders/:id
 * @desc    Update order status
 * @access  Private/Seller
 */
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;