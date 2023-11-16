// Import the database connection from the 'db' module
const db = require('../Database/db');

// SQL query to create a 'user' table if it does not exist
let createUserTableQuery = `
CREATE TABLE IF NOT EXISTS user (
    uID INT PRIMARY KEY,
    name VARCHAR(255),
    role VARCHAR(255),
    hashPassword VARCHAR(255)
);
`;

// Execute the query to create the 'user' table
db.query(createUserTableQuery, (err, result) => {
  if (err) {
    // Handle errors if the table creation query fails
    console.error("Error creating user table:", err);
  } else {
    // Log a success message if the table is created or already exists
    console.log("User table created or already exists");
  }
});

// SQL query to insert sample data into the 'user' table
const insertSampleDataQuery = `
INSERT INTO user (uID, name, role, hashPassword) VALUES
('11', 'Warden A', 'warden', '123'),
('22', 'Warden B', 'warden', '456'),
('33', 'Warden C', 'warden', '789');
`;

// Execute the query to insert sample data into the 'user' table
db.query(insertSampleDataQuery, (err, result) => {
  if (err) {
    // Handle errors if the sample data insertion query fails
    console.error("Error inserting sample data into user table:", err);
  } else {
    // Log a success message if the sample data is inserted into the 'user' table
    console.log("Sample data inserted into user table");
  }
});

// Export the database connection for use in other modules
module.exports = db;
