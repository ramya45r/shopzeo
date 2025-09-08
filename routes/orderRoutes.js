const express = require('express');
const router = express.Router();
const { authenticate, adminOnly } = require('../middlewares/auth');
const orderController = require('../controllers/orderController');

router.get('/my', authenticate, orderController.getMyOrders);
router.get('/', authenticate, adminOnly, orderController.getAllOrders);
router.post('/', authenticate, orderController.createOrder);
router.put('/:id/status', authenticate, adminOnly, orderController.updateOrderStatus);

module.exports = router;
