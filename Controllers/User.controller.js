// Import necessary modules and models
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../Models/User.model');  // Assuming there's a User model defined
const db = require('../Database/db');

// Function to authorize a user by generating a JWT token
const authorizeUser = async (req, res, next) => {
    try {
        // Query to check user credentials in the database
        const qr1 = `select * from user where uID= ${req.body.id} and hashPassword='${req.body.password}'`;
        
        // Execute the query
        db.query(qr1, (err, result) => {
            if (err) {
                // Log an error if there's an issue with the query
                console.log(404, "invalid userid or password");
            } else {
                // If credentials are valid, create a JWT token and send it in the response
                const user = {
                    id: req.body.id,
                    password: req.body.password
                };
                const secretKey = process.env.secretKey;
    
                const token = jwt.sign(user, secretKey, { expiresIn: '15m' });
                res.send(token);
            }
        });
    } catch (error) {
        // Handle any unexpected errors
        next(error)
    }
}

// Function to get all users from the database
const getAllUsers = async (req, res, next) => {
    try {
        // Query to get all users from the 'user' table
        const getAllUsers = `select * from user`;
        
        // Execute the query
        db.query(getAllUsers, (err, result) => {
            if (err) {
                // Log an error if there's an issue with the query
                console.log("Error getting all users");
            } else {
                // Send the result (list of users) in the response
                res.send(result);
            }
        }); 
    } catch (error) {
        // Handle any unexpected errors
        next(createError(400, error.message));
    }
}

// Function to get a user by ID from the database
const getUserbyId = async (req, res, next) => {
    try {
        // Query to get a user by ID from the 'user' table
        const qr1 = `select * from user where uID= ${req.params.id} `;
        
        // Execute the query
        db.query(qr1, (err, result) => {
            if (err) {
                // If user not found, throw a 404 error
                throw createError(404, "user not found");         
            } else {
                // Send the result (user data) in the response
                res.send(result);
            }
        });
    } catch (error) {
        // Handle any unexpected errors
        if (error instanceof mongoose.CastError) {
            next(createError(400, "invalid user id"));
            return;
        }
        next(error);
    }
}

// Function to add a new user to the database
const addUser = async (req, res, next) => {
    try {
        // Query to insert a new user into the 'user' table
        const insertUser = `
            INSERT INTO user (uID, name, role, hashPassword)
            VALUES ('${req.body.uID}', '${req.body.name}', '${ req.body.role}', '${req.body.hashPassword}')
        `;
        
        // Execute the query
        db.query(insertUser, (err, result) => {
            if (err) {
                // Log an error if there's an issue with the query
                console.log({"insert":"fail"});
            } else {
                // Send the result (inserted user data) in the response
                res.send(result);
                console.log({"insert":"success"});
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

// Function to update a user by ID in the database
const updateUserbyId = async (req, res, next) => {
    try {
        // Extract user ID and data from the request
        const id = req.params.id;
        const data = req.body;
        
        // Options for the update operation (not used in the provided code)
        const options = { new: true };

        // Execute the update operation using db.execute
        const [result] = await db.execute('UPDATE users SET ? WHERE id = ?', [data, id]);

        // If no result, throw a 404 error indicating user not found
        if (!result) {
            throw createError(404, "user not found");
        }

        // Send the result (updated user data) in the response
        res.send(result);
    } catch (error) {
        // Handle any unexpected errors
        if (error instanceof mongoose.CastError) {
            next(createError(400, "invalid user id"));
            return;
        }
        next(error);
    }
}

// Function to delete a user by ID from the database
const deleteUserbyId = async (req, res, next) => {
    try {
        // Extract user ID from the request
        const id = req.params.id;

        // Query to delete a user by ID from the 'user' table
        const deleteUser = `
            delete from user where id='${id}'
        `;
        
        // Execute the query
        db.query(deleteUser, (err, result) => {
            if (err) {
                // Log an error if there's an issue with the query
                console.log({"delete":"fail"});
            } else {
                // Send the result (deleted user data) in the response
                res.send(result);
                console.log({"delete":"success"});
            }
        }); 
    } catch (error) {
        // Handle any unexpected errors
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, "invalid user id"));
            return;
        }
        next(error);
    }
}

// Export all controller functions for use in routes
module.exports = {
    getAllUsers,
    getUserbyId,
    updateUserbyId,
    deleteUserbyId,
    addUser,
    authorizeUser
}
