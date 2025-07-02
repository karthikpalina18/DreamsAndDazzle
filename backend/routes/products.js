const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getCategories
} = require('../controllers/productController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Public routes
// @route GET /api/products
router.get('/', getProducts);

// @route GET /api/products/categories
router.get('/categories', getCategories);

// @route GET /api/products/:id
router.get('/:id', getProduct);

// Protected routes
// @route POST /api/products/:id/reviews
router.post('/:id/reviews', auth, addReview);

// Admin routes
// @route POST /api/products
router.post('/', auth, admin, upload.array('images', 5), createProduct);

// @route PUT /api/products/:id
router.put('/:id', auth, admin, upload.array('images', 5), updateProduct);

// @route DELETE /api/products/:id
router.delete('/:id', auth, admin, deleteProduct);

module.exports = router;