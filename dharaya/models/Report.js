const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['air', 'water', 'soil', 'noise', 'other'],
    required: true
  },
  description: {
    type: String,
    required: true,
    minlength: 10
  },
  location: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    default: null
  },
  longitude: {
    type: Number,
    default: null
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending'
  },
  points: {
    type: Number,
    default: 10
  },
  imageUrl: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
reportSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Report', reportSchema);
