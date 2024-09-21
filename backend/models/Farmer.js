const mongoose = require('mongoose');

const FarmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: String, required: true },
  ratings: { type: String, required: true },
  distance: { type: String, required: true },
  img: { type: String, required: true },
  tags: [{ type: String, required: true }],
  duration: { type: String, required: true }
});

module.exports = mongoose.model('Farmer', FarmerSchema);