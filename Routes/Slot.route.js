// Import the express module and create a router
const express = require('express');
const router = express.Router();

// Import the SlotController for handling slot-related routes
const SlotController = require('../Controllers/Slot.controller');

// Import the authentication middleware
const authenticateUser = require('../Utility/authenticate');

// Define routes and their corresponding controller functions for slot operations

// Route to get all slots, protected by the authenticateUser middleware
router.get('/all', authenticateUser, SlotController.getAllSlots);

// Route to get available slots, protected by the authenticateUser middleware
router.get('/available', authenticateUser, SlotController.getAvailableSlots);

// Route to get pending slots, protected by the authenticateUser middleware
router.get('/pending', authenticateUser, SlotController.getPendingSlots);

// Route to add a new slot, protected by the authenticateUser middleware
router.post('/', authenticateUser, SlotController.addSlot);

// Route to book a slot, protected by the authenticateUser middleware
router.post('/book', authenticateUser, SlotController.bookaSlot);

// Export the router for use in other modules
module.exports = router;
