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

// date: 12/01/2025
// prompt - "How can I assign the old and new values (foreign keys) to be sent to my JS file? + Debugging"
// Source URL: https://copilot.microsoft.com/

// date: 12/04/2025
// prompt - "How can I make the dropdowns in my update form preselected with current value?"
// Source URL: https://copilot.microsoft.com/

// date: 12/05/2025
// prompt - "How can I make the create form insert both into Orders and BookOrderDetails tables in one submission? + Debugging"
// Source URL: https://copilot.microsoft.com/

// date: 12/05/2025
// prompt - "How can I enable selection of more than one book for one order? + Debugging"
// Source URL: https://copilot.microsoft.com/

// date: 12/05/2025
// prompt - "Why is the trigger disappear after I reset the database? How can I make it persist?"
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
app.engine('.hbs', engine({ 
    extname: '.hbs',
    helpers:{
        eq: (a, b) => a === b
    }
})); // Create instance of handlebars and add eq helper
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
        const query1 = `SELECT * FROM Users ORDER BY userID;`;
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
        const query2 = 'SELECT genreID, genre FROM Genres;';
        
        const [books] = await db.query(query1);
        const [genres] = await db.query(query2);

        // Render the books.hbs file, and also send the renderer
        // an object that contains our books information
        // showing genre instead of genreID
        res.render('books', { books: books, genres: genres });
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
        const query1 = `SELECT Orders.orderID, Orders.userID, Users.userName AS user, Orders.orderDate, Orders.totalPrice, Orders.street, \
                        Orders.city, Orders.state, Orders.zipCode, Orders.couponID, Coupons.couponCode AS couponCode \
                        FROM Orders \
                        INNER JOIN Users ON Orders.userID = Users.userID \
                        LEFT JOIN Coupons ON Orders.couponID = Coupons.couponID \
                        ORDER BY Orders.orderID;`;
        const query2 = 'SELECT userID, userName FROM Users;';
        const query3 = 'SELECT couponID, couponCode FROM Coupons;';
        const query4 = 'SELECT bookID, title FROM Books;';
        const [orders] = await db.query(query1);
        const [users] = await db.query(query2);
        const [coupons] = await db.query(query3);
        const [books] = await db.query(query4); 


        // Ensure date is a string like "YYYY-MM-DD"
        orders.forEach(order => {
        order.orderDate = new Date(order.orderDate).toISOString().split('T')[0];});

        // Render the orders.hbs file, and also send the renderer
        // an object that contains our orders information
        // showing userName instead of userID and couponCode instead of couponID
        res.render('orders', { orders: orders, users: users, coupons: coupons, books: books });
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
        const query1 = `SELECT Books.title AS book, BookOrderDetails.orderID, BookOrderDetails.bookID, BookOrderDetails.quantityOrdered, BookOrderDetails.price \
                        FROM BookOrderDetails \
                        INNER JOIN Books ON BookOrderDetails.bookID = Books.bookID \
                        ORDER BY BookOrderDetails.orderID;`;
        const query2 = 'SELECT orderID FROM Orders;';
        const query3 = 'SELECT bookID, title FROM Books;';

        const [bookOrderDetails] = await db.query(query1);
        const [orderID] = await db.query(query2);
        const [books] = await db.query(query3);

        // Render the bookorderdetails.hbs file, and also send the renderer
        // an object that contains our bookOrderDetails information
        // showing book title instead of bookID
        res.render('bookorderdetails', { bookOrderDetails: bookOrderDetails, orderID: orderID, books: books});
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
        const query1 = `SELECT * FROM Genres ORDER BY genreID;`;
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
        const query1 = `SELECT * FROM Coupons ORDER BY couponID;`;
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
      await db.query(`
        CREATE TRIGGER trg_DeleteOrderIfNoDetails
        AFTER DELETE ON BookOrderDetails
        FOR EACH ROW
        BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM BookOrderDetails WHERE orderID = OLD.orderID
        ) THEN
          DELETE FROM Orders WHERE orderID = OLD.orderID;
        END IF;
        END;
    `);

       res.send(`
      <p>Reset successful! Reload in 2 seconds</p>
      <script>
        setTimeout(() => { window.location.href = '/'; }, 2000);
      </script>
    `);
    } catch (error) {
      console.error("Error executing PL/SQL:", error);
        // Send a generic error message to the browser
      res.status(500).send("An error occurred while executing the PL/SQL.");
    }
});


// CREATE ROUTES
app.post('/users/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateUser(?, ?, ?, @new_userID);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.create_users_userName,
            data.create_users_email,
            data.create_users_phoneNumber,
        ]);

        console.log(`Created user. User ID: ${rows.new_userID} ` +
            `User Name: ${data.create_users_userName}`
        );

        // Redirect the user to the updated webpage
        res.redirect('/users');
    } catch (error) {
        console.error('Error executing PL/SQL:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the PL/SQL.'
        );
    }
});

app.post('/books/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Cleanse data - If the genreID, quantity, or totalSold aren't numbers, make them NULL.
        if (isNaN(parseInt(data.create_books_genreID)))
            data.create_books_genreID = null;
        if (isNaN(parseInt(data.create_books_quantity)))
            data.create_books_quantity = null;
        if (isNaN(parseInt(data.create_books_totalSold)))
            data.create_books_totalSold = null;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateBook(?, ?, ?, ?, ?, ?, ?, ?, @new_bookID);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.create_books_genreID,
            data.create_books_title,
            data.create_books_author,
            data.create_books_isbn,
            data.create_books_quantity,
            data.create_books_price,
            data.create_books_totalSold,
            data.create_books_description
        ]);

        console.log(`Created book. Book ID: ${rows.new_bookID} ` +
            `Title: ${data.create_books_title}`
        );

        // Redirect the user to the updated webpage
        res.redirect('/books');
    } catch (error) {
        console.error('Error executing PL/SQL:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the PL/SQL.'
        );
    }
});

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
        const query2 = `CALL sp_CreateBookOrderDetail(?, ?, ?, ?);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.create_orders_userID,
            data.create_orders_orderDate,
            data.create_orders_totalPrice,
            data.create_orders_street,
            data.create_orders_city,
            data.create_orders_state,
            data.create_orders_zipCode,
            data.create_orders_couponID
        ]);

        // Insert multiple book details
        const bookIDs = data.create_bookorderdetails_bookID;
        const quantities = data.create_bookorderdetails_quantityOrdered;
        const prices = data.create_bookorderdetails_price;

        for (let i = 0; i < bookIDs.length; i++) {
            await db.query(query2,[
            bookIDs[i],
            rows.new_id,
            quantities[i],
            prices[i]
        ]);
        }

        console.log(` Created order & book order detail. ID: ${rows.new_id} `);
        
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

app.post('/genres/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateGenre(?, @new_genreID);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.create_genres_genre
        ]);

        console.log(`Created genre. Genre ID: ${rows.new_genreID} ` +
            `Genre: ${data.create_genres_genre}`
        );

        // Redirect the user to the updated webpage
        res.redirect('/genres');
    } catch (error) {
        console.error('Error executing PL/SQL:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the PL/SQL.'
        );
    }
});

app.post('/coupons/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Cleanse data - If the genreID, quantity, or totalSold aren't numbers, make them NULL.
        if (isNaN(parseInt(data.create_coupons_discount)))
            data.create_coupons_discount = null;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateCoupon(?, ?, ?, @new_couponID);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.create_coupons_couponCode,
            data.create_coupons_discountType,
            data.create_coupons_discount
        ]);

        console.log(`Created coupon. Coupon ID: ${rows.new_couponID} ` +
            `Coupon Code: ${data.create_coupons_couponCode}`
        );

        // Redirect the user to the updated webpage
        res.redirect('/coupons');
    } catch (error) {
        console.error('Error executing PL/SQL:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the PL/SQL.'
        );
    }
});


// DELETE ROUTES
app.post('/users/delete', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteUser(?);`;
        await db.query(query1, [data.delete_users_userID]);

        console.log(`Deleted User. Book ID: ${data.delete_users_userID} ` +
            `User Name: ${data.delete_users_userName}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/users');
    } catch (error) {
        console.error('Error executing PL/SQL:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the PL/SQL.'
        );
    }
});

app.post('/books/delete', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteBook(?);`;
        await db.query(query1, [data.delete_books_bookID]);

        console.log(`Deleted Book. Book ID: ${data.delete_books_bookID} ` +
            `Title: ${data.delete_books_title}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/books');
    } catch (error) {
        console.error('Error executing PL/SQL:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the PL/SQL.'
        );
    }
});

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

app.post('/bookorderdetails/delete', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute the query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteBookOrderDetail(?, ?);`;
        await db.query(query1, [data.delete_order_id, data.delete_book_id]);

        console.log(` Deleted bookOrderDetail with order ID: ${data.delete_order_id} book ID: ${data.delete_book_id} `);

        // Redirect back to the Orders page
        res.redirect('/bookorderdetails');
    } catch (error) {
        console.error('Error executing PL/SQL:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the PL/SQL.'
        );
    }
});

app.post('/genres/delete', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteGenre(?);`;
        await db.query(query1, [data.delete_genres_genreID]);

        console.log(`Deleted genre. Genres ID: ${data.delete_genres_genreID} ` +
            `Genre: ${data.delete_genres_genre}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/genres');
    } catch (error) {
        console.error('Error executing PL/SQL:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the PL/SQL.'
        );
    }
});

app.post('/coupons/delete', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteCoupon(?);`;
        await db.query(query1, [data.delete_coupons_couponID]);

        console.log(`Deleted coupon. Coupon ID: ${data.delete_coupons_couponID} ` +
            `Coupon Code: ${data.delete_coupons_couponCode}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/coupons');
    } catch (error) {
        console.error('Error executing PL/SQL:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the PL/SQL.'
        );
    }
});


// UPDATE ROUTES
app.post('/users/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = 'CALL sp_UpdateUser(?, ?, ?, ?);';
        await db.query(query1, [
            data.update_users_userID,
            data.update_users_userName,
            data.update_users_email,
            data.update_users_phoneNumber,
        ]);

        console.log(`Updated user. User ID: ${data.update_users_userID} ` +
            `User Name: ${data.update_users_userName}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/users');
    } catch (error) {
        console.error('Error executing PL/SQL:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the PL/SQL.'
        );
    }
});

app.post('/books/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        // Cleanse data - If the genreID, quantity, or totalSold aren't numbers, make them NULL.
        if (isNaN(parseInt(data.update_books_genreID)))
            data.update_books_genreID = null;
        if (isNaN(parseInt(data.update_books_quantity)))
            data.update_books_quantity = null;
        if (isNaN(parseInt(data.update_books_totalSold)))
            data.update_books_totalSold = null;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = 'CALL sp_UpdateBook(?, ?, ?, ?, ?, ?, ?, ?, ?);';
        await db.query(query1, [
            data.update_books_bookID,
            data.update_books_genreID,
            data.update_books_title,
            data.update_books_author,
            data.update_books_isbn,
            data.update_books_quantity,
            data.update_books_price,
            data.update_books_totalSold,
            data.update_books_description
        ]);

        console.log(`Updated book. Book ID: ${data.update_books_bookID} ` +
            `Title: ${data.update_books_title}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/books');
    } catch (error) {
        console.error('Error executing PL/SQL:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the PL/SQL.'
        );
    }
});

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

        console.log(`Updated order. ID: ${data.update_orders_orderID} `);
        
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
        const query1 = 'CALL sp_UpdateBookOrderDetail(?, ?, ?, ?, ?, ?);';
        await db.query(query1, [
            data.old_orderID,
            data.old_bookID,
            data.update_bookorderdetails_orderID,
            data.update_bookorderdetails_bookID,
            data.update_bookorderdetails_quantityOrdered,
            data.update_bookorderdetails_price
        ]);

        console.log(`Updated book order detail. Order ID: ${data.update_bookorderdetails_orderID} ` + `Book ID: ${data.update_bookorderdetails_bookID}`);

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

app.post('/genres/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = 'CALL sp_UpdateGenre(?, ?);';
        await db.query(query1, [
            data.update_genres_genreID,
            data.update_genres_genre
        ]);

        console.log(`Updated genre. Genre ID: ${data.update_genres_genreID} ` +
            `Genre: ${data.update_genres_genre}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/genres');
    } catch (error) {
        console.error('Error executing PL/SQL:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the PL/SQL.'
        );
    }
});

app.post('/coupons/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        // Cleanse data - If the genreID, quantity, or totalSold aren't numbers, make them NULL.
        if (isNaN(parseInt(data.update_coupons_discount)))
            data.update_coupons_discount = null;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = 'CALL sp_UpdateCoupon(?, ?, ?, ?);';
        await db.query(query1, [
            data.update_coupons_couponID,
            data.update_coupons_couponCode,
            data.update_coupons_discountType,
            data.update_coupons_discount
        ]);

        console.log(`Updated coupon. Coupon ID: ${data.update_coupons_couponID} ` +
            `Coupon Code: ${data.update_coupons_couponCode}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/coupons');
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
