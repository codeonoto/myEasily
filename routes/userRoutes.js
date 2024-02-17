const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Home route
router.get("/", userController.showHome);

// Register user route
router.get("/register", userController.showRegister);
router.post('/register', userController.registerUser);

// Login user route
router.get("/login", userController.showLogin);
router.post('/login', userController.loginUser);

// Logout user route
router.get('/logout', userController.logoutUser);

module.exports = router;
