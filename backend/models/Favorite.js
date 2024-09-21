const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
  consumer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  addedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
