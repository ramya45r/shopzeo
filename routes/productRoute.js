const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authenticate, adminOnly } = require('../middlewares/auth');
const productController = require('../controllers/prodctController');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'))
});
const upload = multer({ storage });
// Routes
router.post('/', authenticate, adminOnly, upload.array('images', 5), productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', authenticate, adminOnly, upload.array('images', 5), productController.updateProduct);
router.delete('/:id', authenticate, adminOnly, productController.deleteProduct);
module.exports = router;
