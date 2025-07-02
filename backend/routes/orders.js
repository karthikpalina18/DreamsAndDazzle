const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
  cancelOrder
} = require('../controllers/orderController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Protected routes (User)
// @route POST /api/orders
router.post('/', auth, createOrder);

// @route GET /api/orders/my-orders
router.get('/my-orders', auth, getMyOrders);

// @route GET /api/orders/:id
router.get('/:id', auth, getOrder);

// @route PUT /api/orders/:id/cancel
router.put('/:id/cancel', auth, cancelOrder);

// Admin routes
// @route GET /api/orders
router.get('/', auth, admin, getAllOrders);

// @route PUT /api/orders/:id/status
router.put('/:id/status', auth, admin, updateOrderStatus);

module.exports = router;