const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, index: 'text' },
  description: String,
  price: { type: Number, required: true },
  category: { type: String, index: true },
  images: [String],
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

productSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
