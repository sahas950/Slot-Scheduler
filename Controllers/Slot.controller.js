// Import necessary modules and models
const User = require('../Models/Slots.model.js');  // Assuming there's a Slots model defined
const createError = require('http-errors');
const db = require('../Database/db');

// Function to get available slots from the database
const getAvailableSlots = async (req, res, next) => {
    try {
        // Query to get slots that are not booked and have a future date
        const query = `
            SELECT * FROM slots
            WHERE booked = false AND date > NOW();
        `;
        
        // Execute the query
        db.query(query, (err, result) => {
            if (err) {
                // Log an error if there's an issue with the query
                console.log("Error in getting slots");
            } else {
                // Send the result (available slots) in the response
                res.send(result);
            }
        }); 
    } catch (error) {
        // Handle any unexpected errors
        next(error);
    }
}

// Function to book a slot in the database
const bookaSlot = async (req, res, next) => {
    try {
        // Query to update a slot as booked by a specific user
        const query = `
            UPDATE slots
            SET booker=(select uid from user where name='${req.body.name}'),booked="1"
            WHERE id = '${req.body.slotID}';
        `;
        
        // Execute the query
        db.query(query, (err, result) => {
            if (err) {
                // Log an error if there's an issue with the query
                console.log("Error in booking slots");
            } else {
                // Send the result (updated slot data) in the response
                res.send(result);
            }
        }); 
    } catch (error) {
        // Handle any unexpected errors
        next(error);
    }
}

// Function to get pending slots for the authenticated user
const getPendingSlots = async (req, res, next) => {
    try {
        // Query to get slots that are booked, belong to the authenticated user, and have a future date
        const query = `
            SELECT * FROM slots
            WHERE booked = true AND orgPerson= '${req.user.uID}' AND date > NOW();
        `;
        console.log(query);
        
        // Execute the query
        db.query(query, (err, result) => {
            if (err) {
                // Log an error if there's an issue with the query
                console.log("Error in getting slots");
            } else {
                // Send the result (pending slots) in the response
                res.send(result);
            }
        }); 
    } catch (error) {
        // Handle any unexpected errors
        next(error);
    }
}

// Function to update a slot by ID in the database
const updateSlotById = async (req, res, next) => {
    try {
        // Extract slot ID and updated date from the request
        const id = req.params.id;
        const { date } = req.body;

        // Query to update the date of a specific slot
        const query = `
            UPDATE slots
            SET date='${date}'
            WHERE id = '${id}';
        `;
        
        // Execute the query
        db.query(query, (err, result) => {
            if (err) {
                // Log an error if there's an issue with the query
                console.log("Error in getting slots");
            } else {
                // Send the result (updated slot data) in the response
                res.send(result);
            }
        });
    } catch (error) {
        // Handle any unexpected errors
        next(error);
    }
}

// Function to get all slots from the database
const getAllSlots = async (req, res, next) => {
    try {
        // Query to get all slots from the 'slots' table
        const query1 = `
            SELECT * FROM slots;
        `;
        
        // Execute the query
        db.query(query1, (err, result) => {
            if (err) {
                // Log an error if there's an issue with the query
                console.log("Error in getting slots");
            } else {
                // Send the result (list of all slots) in the response
                res.send(result);
            }
        }); 
    } catch (error) {
        // Handle any unexpected errors
        next(error);
    }
}

// Function to add a new slot to the database
const addSlot = async (req, res, next) => {
    try {
        // Extract date and duration from the request
        const { date, duration } = req.body;

        // Query to insert a new slot into the 'slots' table
        const query = `
            INSERT INTO slots (date, duration, orgPerson, booked)
            VALUES ('${date}', '${duration}', '${req.user.uID}', false);
        `;
        console.log(query);

        // Execute the query
        db.query(query, (err, result) => {
            if (err) {
                // Log an error if there's an issue with the query
                console.log("Error in adding slots");
            } else {
                // Send the result (inserted slot data) in the response
                res.send(result);
            }
        }); 
    } catch (error) {
        // Handle any unexpected errors, especially validation errors
        if (error.name === 'ValidationError') {
            next(createError(422, error.message));
            return;
        }
        next(error);
    }
}

// Export all controller functions for use in routes
module.exports = {
    getAvailableSlots,
    bookaSlot,
    getPendingSlots,
    updateSlotById,
    getAllSlots,
    addSlot,
};
