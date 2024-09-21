const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Get all orders for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ consumer: req.user.id }).populate('items.product');
    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a specific order by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    if (order.consumer.toString() !== req.user.id && order.farmer.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to view this order' });
    }
    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new order
router.post('/', auth, async (req, res) => {
  try {
    const { items, total } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0 || !total) {
      return res.status(400).json({ error: 'Invalid order data' });
    }

    const productIds = items.map(item => mongoose.Types.ObjectId(item.product));
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length === 0) {
      return res.status(404).json({ error: 'No products found' });
    }

    const newOrder = new Order({
      consumer: req.user.id,
      farmer: products[0].farmer,
      items: items,
      total: total,
      status: 'pending'
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update order status (only for farmers)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.farmer.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this order' });
    }

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated successfully', order });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;