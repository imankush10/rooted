const mongoose = require('mongoose');

const BundleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: String, required: true },
  ratings: { type: String, required: true },
  distance: { type: String, required: true },
  img: { type: String, required: true },
  tags: [{ type: String, required: true }],
  delivery: { type: String, required: true },
  about: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }]
});

module.exports = mongoose.model('Bundle', BundleSchema);