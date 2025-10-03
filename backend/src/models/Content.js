const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  originalContent: { type: String, required: true },
  summary: { type: String },
  rating: { type: Number },
  price: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);