const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Favorite = require('../models/Favorite');
const Product = require('../models/Product');

// Get all favorites for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const favorites = await Favorite.find({ consumer: req.user.id }).populate('product');
    res.json(favorites);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a product to favorites
router.post('/', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let favorite = await Favorite.findOne({ consumer: req.user.id, product: productId });
    if (favorite) {
      return res.status(400).json({ error: 'Product already in favorites' });
    }

    favorite = new Favorite({
      consumer: req.user.id,
      product: productId
    });

    await favorite.save();
    res.status(201).json({ message: 'Product added to favorites', favorite });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove a product from favorites
router.delete('/:id', auth, async (req, res) => {
  try {
    const favorite = await Favorite.findById(req.params.id);
    if (!favorite) {
      return res.status(404).json({ error: 'Favorite not found' });
    }

    if (favorite.consumer.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to remove this favorite' });
    }

    await favorite.remove();
    res.json({ message: 'Product removed from favorites' });
  } catch (error) {
    console.error('Error removing from favorites:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
