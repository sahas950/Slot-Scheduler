// Import the database connection from the 'db' module
const db = require('../Database/db');

// SQL query to create a 'slots' table if it does not exist
let createSlotsTableQuery = `
CREATE TABLE IF NOT EXISTS slots (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATETIME,
    duration INT,
    booked BOOLEAN,
    orgPerson INT,
    booker INT,
    FOREIGN KEY (orgPerson) REFERENCES user(uID),
    FOREIGN KEY (booker) REFERENCES user(uID)
);
`;

// Execute the query to create the 'slots' table
db.query(createSlotsTableQuery, (err, result) => {
  if (err) {
    // Handle errors if the table creation query fails
    console.error("Error creating slots table:", err);
  } else {
    // Log a success message if the table is created or already exists
    console.log("Slots table created or already exists");
  }
});

// SQL query to insert sample data into the 'slots' table
const insertSampleDataQuery = `
INSERT INTO slots (date, duration, orgPerson, booked) VALUES
('2023-11-16', 60, '22', false),
('2023-11-17', 60, '22', false),
('2023-11-18', 60, '22', false);
`;

// Execute the query to insert sample data into the 'slots' table
db.query(insertSampleDataQuery, (err, result) => {
  if (err) {
    // Handle errors if the sample data insertion query fails
    console.error("Error inserting sample data into slots table:", err);
  } else {
    // Log a success message if the sample data is inserted into the 'slots' table
    console.log("Sample data inserted into slots table");
  }
});

// Export the database connection for use in other modules
module.exports = db;
