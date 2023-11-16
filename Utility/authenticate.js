// Import necessary modules
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const db = require('../Database/db');

// Get the secret key from environment variables
const secretKey = process.env.secretKey;

// Middleware function for authentication
const authenticate = async (req, res, next) => {
    try {
        // Extract the authorization header from the request
        const authHeader = req.headers['authorization'];
        
        // Extract the token from the authorization header
        const token = authHeader && authHeader.split(' ')[1];

        // Check if token exists
        if (!token) {
            // If no token is present, return Unauthorized error
            return next(createError(401, 'Unauthorized'));
        }

        // Verify the token using the secret key
        jwt.verify(token, secretKey, async (err, user) => {
            // Handle token verification errors
            if (err) {
                // If token is invalid, return Forbidden error
                return next(createError(403, 'Forbidden - Invalid token'));
            }

            try {
                // Query the database to find user information based on the user ID in the token
                const qr1 = `SELECT * FROM user WHERE uID = ${user.id}`;
                
                // Execute the database query
                db.query(qr1, (err, results) => {
                    // Handle database query errors
                    if (err) {
                        // If there is a database error, return Internal Server Error
                        return next(createError(500, 'Internal Server Error'));
                    }

                    // Check if user is found in the database
                    if (results.length === 0) {
                        // If user is not found, return Forbidden error
                        return next(createError(403, 'Forbidden - User not found'));
                    }

                    // Attach the user information to the request object for future use
                    req.user = results[0];
                    
                    // Continue to the next middleware or route
                    next();
                });
            } catch (error) {
                // Handle any other errors that may occur during the process
                return next(error);
            }
        });
    } catch (error) {
        // Handle any unexpected errors
        return next(error);
    }
};

// Export the authenticate middleware for use in other modules
module.exports = authenticate;
