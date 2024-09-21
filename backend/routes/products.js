const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Product = require('../models/Product');

// Create a new product
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'farmer') {
      return res.status(403).json({ error: 'Only farmers can create products' });
    }

    const { name, price, description, image } = req.body;
    const newProduct = new Product({
      farmer: req.user.id,
      name,
      price,
      description,
      image
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('farmer', 'name');
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('farmer', 'name');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a product
router.put('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.farmer.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You can only update your own products' });
    }

    const { name, price, description, image } = req.body;
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;

    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a product
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.farmer.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You can only delete your own products' });
    }

    await product.remove();
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
