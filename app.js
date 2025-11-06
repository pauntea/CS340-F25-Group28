// Citation for CS 340 Project - Group 28
// Date: 11/06/2025
// Adapted from and based on CS 340 - Exploration - Web Application Technology
// Source URL (Web Application): https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131

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
                        INNER JOIN Coupons ON Orders.couponID = Coupons.couponID;`;
        const [orders] = await db.query(query1);

        // Render the orders.hbs file, and also send the renderer
        // an object that contains our orders information
        // showing userName instead of userID and couponCode instead of couponID
        res.render('orders', { orders: orders });
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
        const [bookOrderDetails] = await db.query(query1);

        // Render the bookorderdetails.hbs file, and also send the renderer
        // an object that contains our bookOrderDetails information
        // showing book title instead of bookID
        res.render('bookorderdetails', { bookOrderDetails: bookOrderDetails});
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

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log(
        'Express started on http://localhost:' +
            PORT +
            '; press Ctrl-C to terminate.'
    );
});