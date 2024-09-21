const mongoose = require('mongoose');
const Bundle = require('./Bundle');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true },
  bundle: { type: mongoose.Schema.Types.ObjectId, ref: 'Bundle', required: true }
});

module.exports = mongoose.model('Product', ProductSchema);