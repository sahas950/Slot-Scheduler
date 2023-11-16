// Import the express module and create a router
const express = require('express');
const router = express.Router();

// Import the UserController for handling user-related routes
const UserController = require('../Controllers/User.controller');

// Import the authentication middleware
const authenticateUser = require('../Utility/authenticate');

// Define routes and their corresponding controller functions

// Route for user login, handled by the authorizeUser function in UserController
router.post('/login', UserController.authorizeUser);

// Route to get a user by ID, protected by the authenticateUser middleware
router.get('/:id', authenticateUser, UserController.getUserbyId);

// Route to update a user by ID, protected by the authenticateUser middleware
router.post('/update/:id', authenticateUser, UserController.updateUserbyId);

// Route to delete a user by ID, protected by the authenticateUser middleware
router.get('/delete/:id', authenticateUser, UserController.deleteUserbyId);

// Route to add a new user, protected by the authenticateUser middleware
router.post('/', authenticateUser, UserController.addUser);

// Route to get all users, protected by the authenticateUser middleware
router.get('/', authenticateUser, UserController.getAllUsers);

// Export the router for use in other modules
module.exports = router;
