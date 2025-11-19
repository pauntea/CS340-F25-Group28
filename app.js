// Citation for CS 340 Project - Group 28
// Date: 11/06/2025
// Adapted from and based on CS 340 - Exploration - Web Application Technology and Step 4 Draft
// Source URL (Web Application): https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131
// Source URL (Step 4 Draft): https://canvas.oregonstate.edu/courses/2017561/assignments/10111742

// AI tools were used: 
// date: 11/13/2025
// prompt - "how to make the orderDate show as date only not full timestamp in this code snippet?"
// Source URL: https://copilot.microsoft.com/

// date: 11/19/2025
// prompt - "how to show a reset success message and redirect to a page in this code snippet?"
// Source URL: https://copilot.microsoft.com/


// ########################################
// ########## SETUP

// Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = 44228;

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
        const query3 = 'SELECT bookID, title FROM Books;';
        const [bookOrderDetails] = await db.query(query1);
        const [orderID] = await db.query(query2);
        const [books] = await db.query(query3);

        // Render the bookorderdetails.hbs file, and also send the renderer
        // an object that contains our bookOrderDetails information
        // showing book title instead of bookID
        res.render('bookorderdetails', { bookOrderDetails: bookOrderDetails, orderID: orderID, books: books });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
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

// DELETE ROUTES
app.get('/delete-order327', async function (req, res) {
    try {
        const query1 = 'CALL DeleteOrder327();';
      await db.query(query1);

      // Redirect back to the Orders page
    res.redirect('/orders');
    } catch (error) {
      console.error("Error executing PL/SQL:", error);
        // Send a generic error message to the browser
      res.status(500).send("An error occurred while executing the PL/SQL.");
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

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log(
        'Express started on http://localhost:' +
            PORT +
            '; press Ctrl-C to terminate.'
    );
});