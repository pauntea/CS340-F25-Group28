// Citation for CS 340 Project - Group 28
// Date: 11/06/2025
// Adapted from and based on CS 340 - Exploration - Web Application Technology
// Source URL (Web Application): https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131

// Get an instance of mysql we can use in the app
let mysql = require('mysql2')

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host              : 'classmysql.engr.oregonstate.edu',
    user              : '[username]',
    password          : '[password]',
    database          : '[database]'
}).promise(); // This makes it so we can use async / await rather than callbacks

// Export it for use in our application
module.exports = pool;