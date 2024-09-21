const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: ['consumer', 'farmer']
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  farmDetails: {
    type: String,
    required: function() { return this.role === 'farmer'; }
  },
});

module.exports = mongoose.model('User', UserSchema);