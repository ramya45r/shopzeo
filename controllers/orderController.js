const Order = require('../models/Order');
const Product = require('../models/Product');

// Create new order
exports.createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress } = req.body;
    if (!items || !items.length) {
      return res.status(400).json({ message: 'No items' });
    }

    let total = 0;
    const orderItems = [];

    for (const it of items) {
      const p = await Product.findById(it.product);
      if (!p) {
        return res.status(400).json({ message: 'Product not found ' + it.product });
      }
      if (p.stock < it.qty) {
        return res.status(400).json({ message: 'Insufficient stock for ' + p.title });
      }

      p.stock -= it.qty;
      await p.save();

      orderItems.push({
        product: p._id,
        name: p.title,
        price: p.price,
        qty: it.qty
      });

      total += p.price * it.qty;
    }

    const order = new Order({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      totalPrice: total
    });

    const saved = await order.save();

    // emit socket event
    const io = req.app.get('io');
    io.emit('newOrder', { orderId: saved._id, total: saved.totalPrice });

    res.json(saved);
  } catch (err) {
    next(err);
  }
};

// Get orders for logged-in user
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// Admin: get all orders
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('user')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// Admin: update order status
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Not found' });
    }

    order.status = status;
    await order.save();

    const io = req.app.get('io');
    io.emit('orderUpdated', { orderId: order._id, status: order.status });

    res.json(order);
  } catch (err) {
    next(err);
  }
};
