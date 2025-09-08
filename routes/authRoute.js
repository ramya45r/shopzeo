const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');

// Register route
router.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], authController.register);

// Login route
router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], authController.login);

module.exports = router;
