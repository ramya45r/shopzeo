const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    qty: Number
  }],
  shippingAddress: { street: String, city: String, state: String, zip: String },
  totalPrice: Number,
  status: { type: String, enum: ['placed','processing','shipped','delivered','cancelled'], default: 'placed' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
