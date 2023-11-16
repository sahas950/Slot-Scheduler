// Import the 'mysql2' module for MySQL database connectivity
const mysql = require('mysql2');

// Create a MySQL database connection using the provided connection details
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sahastranshu1@',
  database: 'slotbook',
  port: 3306
});

// Connect to the MySQL database
db.connect(err => {
  if (err) {
    // Handle errors if the connection fails
    console.log(err, 'dberr');
  }
  // Log a success message if the connection is established
  console.log('database connected.');
});

// Export the MySQL database connection for use in other modules
module.exports = db;
