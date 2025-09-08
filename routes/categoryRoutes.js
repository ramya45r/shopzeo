const express = require('express');
const router = express.Router();
const { 
  createCategory, 
  getCategories, 
  updateCategory, 
  deleteCategory 
} = require('../controllers/categoryController');
const { authenticate, adminOnly } = require('../middlewares/auth'); 

// Get all categories
router.get('/', getCategories);

// Update category
router.put('/:id', authenticate, adminOnly, updateCategory);
// Create category
router.post('/', authenticate, adminOnly, createCategory);


// Delete category
router.delete('/:id', authenticate, adminOnly, deleteCategory);

module.exports = router;
