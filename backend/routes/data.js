const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer');
const Bundle = require('../models/Bundle');
const Product = require('../models/Product');

// Get all farmers
router.get('/farmers', async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.json(farmers);
  } catch (error) {
    console.error('Error fetching farmers:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all bundles
router.get('/bundles', async (req, res) => {
  try {
    const bundles = await Bundle.find();
    res.json(bundles);
  } catch (error) {
    console.error('Error fetching bundles:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find().populate('farmer', 'name'); // Populate farmer name
        console.log('logging products', products)
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
