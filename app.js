// Citation for CS 340 Project - Group 28
// Date: 11/06/2025, 11/28/2025 (CUD)
// Adapted from and based on CS 340 - Explorations - Web Application Technology and Implementing CUD operations in your app and Step 4 Draft
// Source URL (Web Application): https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131
// Source URL (Step 4 Draft): https://canvas.oregonstate.edu/courses/2017561/assignments/10111742
// Source URL (CUD): https://canvas.oregonstate.edu/courses/2017561/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25645149

// AI tools were used: 
// date: 11/13/2025
// prompt - "how to make the orderDate show as date only not full timestamp in this code snippet?"
// Source URL: https://copilot.microsoft.com/

// date: 11/19/2025
// prompt - "how to show a reset success message and redirect to a page in this code snippet?"
// Source URL: https://copilot.microsoft.com/

// date: 11/24/2025
// prompt - "how to check and make couponID as NULL if it's empty string in this code snippet in app.js?"
// Source URL: https://copilot.microsoft.com/

// date: 11/28/2025
// prompts - "I have two select fields. I want to update the second drop-down list options to display only values that are under the selected first value. 
//            How can I implement this when I am using SQL and HBS to display the choices? I want HBS to show the values when I do SELECT WHERE."
//         - Reload fixes - JS script for fetch + JS Debugging
// Source URL: https://copilot.microsoft.com/

// ########################################
// ########## SETUP

// Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = 44028;

// Database
const db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars'); // Import express-handlebars engine
app.engine('.hbs', engine({ extname: '.hbs' })); // Create instance of handlebars
app.set('view engine', '.hbs'); // Use handlebars engine for *.hbs files.

// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES
app.get('/', async function (req, res) {
    try {
        res.render('home'); // Render the home.hbs file
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});

app.get('/users', async function (req, res) {
    try {
        // Create and execute our queries
        const query1 = `SELECT * FROM Users;`;
        const [users] = await db.query(query1);

        // Render the users.hbs file, and also send the renderer
        // an object that contains our users information
        res.render('users', { users: users });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/books', async function (req, res) {
    try {
        // Create and execute our queries
        const query1 = `SELECT Books.bookID, Genres.genre AS genre, Books.title, Books.author, Books.isbn, \
                        Books.quantity, Books.price, Books.totalSold, Books.description \
                        FROM Books \
                        INNER JOIN Genres ON Books.genreID = Genres.genreID;`;
        const [books] = await db.query(query1);

        // Render the books.hbs file, and also send the renderer
        // an object that contains our books information
        // showing genre instead of genreID
        res.render('books', { books: books });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/orders', async function (req, res) {
    try {
        // Create and execute our queries
        const query1 = `SELECT Orders.orderID, Users.userName AS user, Orders.orderDate, Orders.totalPrice, Orders.street, \
                        Orders.city, Orders.state, Orders.zipCode, Coupons.couponCode AS couponCode \
                        FROM Orders \
                        INNER JOIN Users ON Orders.userID = Users.userID \
                        LEFT JOIN Coupons ON Orders.couponID = Coupons.couponID \
                        ORDER BY Orders.orderID;`;
        const query2 = 'SELECT userID, userName FROM Users;';
        const query3 = 'SELECT couponID, couponCode FROM Coupons;';
        const [orders] = await db.query(query1);
        const [users] = await db.query(query2);
        const [coupons] = await db.query(query3);


        // Ensure date is a string like "YYYY-MM-DD"
        orders.forEach(order => {
        order.orderDate = new Date(order.orderDate).toISOString().split('T')[0];});

        // Render the orders.hbs file, and also send the renderer
        // an object that contains our orders information
        // showing userName instead of userID and couponCode instead of couponID
        res.render('orders', { orders: orders, users: users, coupons: coupons });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/bookorderdetails', async function (req, res) {
    try {
        // Create and execute our queries
        const query1 = `SELECT Books.title AS book, BookOrderDetails.orderID, BookOrderDetails.quantityOrdered, BookOrderDetails.price \
                        FROM BookOrderDetails \
                        INNER JOIN Books ON BookOrderDetails.bookID = Books.bookID;`;
        const query2 = 'SELECT orderID FROM Orders;';

        const [bookOrderDetails] = await db.query(query1);
        const [orderID] = await db.query(query2);

        // Render the bookorderdetails.hbs file, and also send the renderer
        // an object that contains our bookOrderDetails information
        // showing book title instead of bookID
        res.render('bookorderdetails', { bookOrderDetails: bookOrderDetails, orderID: orderID });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/bookorderdetails/get-books', async (req, res) => {
    const selectedOrderID = req.query.orderID;
    // SELECT depending on previously selected OrderID
    const query3 = `
      SELECT Books.bookID, title
      FROM Books
      INNER JOIN BookOrderDetails ON Books.bookID = BookOrderDetails.bookID
      WHERE BookOrderDetails.orderID = ?;
    `;
    const [books] = await db.query(query3, [selectedOrderID]);
    res.json(books);
});

app.get('/genres', async function (req, res) {
    try {
        // Create and execute our queries
        const query1 = `SELECT * FROM Genres;`;
        const [genres] = await db.query(query1);

        // Render the genres.hbs file, and also send the renderer
        // an object that contains our genres information
        res.render('genres', { genres: genres });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/coupons', async function (req, res) {
    try {
        // Create and execute our queries
        const query1 = `SELECT * FROM Coupons;`;
        const [coupons] = await db.query(query1);

        // Render the coupons.hbs file, and also send the renderer
        // an object that contains our coupons information
        res.render('coupons', { coupons: coupons });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});


// RESET ROUTES
app.get('/reset', async function (req, res) {
    try {
        const query1 = 'CALL sp_load_bookstoredb();';
      await db.query(query1);
       res.send(`
      <p>Reset successful! Reload in 2 seconds</p>
      <script>
        setTimeout(() => { window.location.href = '/orders'; }, 2000);
      </script>
    `);
    } catch (error) {
      console.error("Error executing PL/SQL:", error);
        // Send a generic error message to the browser
      res.status(500).send("An error occurred while executing the PL/SQL.");
    }
});


// CREATE ROUTES
app.post('/orders/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;
                
        // If the couponID is empty string, make it null.
        if (data.create_orders_couponID.length === 0) {
            data.create_orders_couponID = null;
        }

        // Create and execute the query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateOrder(?, ?, ?, ?, ?, ?, ?, ?, @new_id);`;


        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.create_orders_userID,
            data.create_orders_orderDate,
            data.create_orders_totalPrice,
            data.create_orders_street,
            data.create_orders_city,
            data.create_orders_state,
            data.create_orders_zipCode,
            data.create_orders_couponID,
        ]);

        console.log(` Created order. ID: ${rows.new_id} `);
        
        // Redirect back to the Orders page
        res.redirect('/orders');
    } catch (error) {
        console.error('Error executing PL/SQL:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the PL/SQL.'
        );
    }
});


// DELETE ROUTES
app.post('/orders/delete', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute the query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteOrder(?);`;
        await db.query(query1, [data.delete_orders_id]);

        console.log(` Deleted order. ID: ${data.delete_orders_id} `);

        // Redirect back to the Orders page
        res.redirect('/orders');
    } catch (error) {
        console.error('Error executing PL/SQL:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the PL/SQL.'
        );
    }
});


// UPDATE ROUTES
app.post('/orders/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;
                
        // If the couponID is empty string, make it null.
        if (data.update_orders_couponID.length === 0) {
            data.update_orders_couponID = null;
        }

        // Create and execute the query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_UpdateOrder(?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        await db.query(query1, [
            data.update_orders_orderID,
            data.update_orders_userID,
            data.update_orders_orderDate,
            data.update_orders_totalPrice,
            data.update_orders_street,
            data.update_orders_city,
            data.update_orders_state,
            data.update_orders_zipCode,
            data.update_orders_couponID,
            ]);

        console.log(` Update order. ID: ${data.update_orders_orderID} `);
        
        // Redirect back to the Orders page
        res.redirect('/orders');
    } catch (error) {
        console.error('Error executing PL/SQL:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the PL/SQL.'
        );
    }
});

app.post('/bookorderdetails/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        // Cleanse data - If the quantityOrdered or price aren't numbers, make them NULL.
        if (isNaN(parseInt(data.update_bookorderdetails_quantityOrdered)))
            data.update_bookorderdetails_quantityOrdered = null;
        if (isNaN(parseInt(data.update_bookorderdetails_price)))
            data.update_bookorderdetails_price = null;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = 'CALL sp_UpdateBookOrderDetails(?, ?, ?, ?);';
        await db.query(query1, [
            data.update_bookorderdetails_orderID,
            data.update_bookorderdetails_bookID,
            data.update_bookorderdetails_quantityOrdered,
            data.update_bookorderdetails_price
        ]);

        console.log(`UPDATE BookOrderDetails. Order ID: ${data.update_bookorderdetails_orderID} ` + `Book ID: ${data.update_bookorderdetails_bookID}`);

        // Redirect the user to the updated webpage data
        res.redirect('/bookorderdetails');
    } catch (error) {
        console.error('Error executing PL/SQL:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the PL/SQL.'
        );
    }
});


// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log(
        'Express started on http://localhost:' +
            PORT +
            '; press Ctrl-C to terminate.'
    );
});