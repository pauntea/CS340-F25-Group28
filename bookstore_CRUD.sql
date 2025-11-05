-- Group 28 
-- Kozy Nook’s Books Sales Management System
-- Xichun Xu & Adrienne Jaimie Paunte

-- Database Manipulation queries for a partially implemented Project Website using the bookstore database.

-- --------------------------------------------------------
-- READ OPERATIONS for all tables
-- --------------------------------------------------------

-- get all records from Coupons table
SELECT * FROM Coupons;

-- get all records from Genres table
SELECT * FROM Genres;

-- get all records from Users table
SELECT * FROM Users;

-- get all records from Books table, showing genre instead of genre Id
SELECT Books.bookID, Genres.genre AS genre, Books.title, Books.author, Books.isbn, 
    Books.quantity, Books.price, Books.totalSold, Books.description
FROM Books
INNER JOIN Genres ON Books.genreID = Genres.genreID;

-- get all records from Orders table, showing username instead of user Id and couponCode instead of coupon Id
SELECT Orders.orderID, Users.userName AS user, Orders.orderDate, Orders.totalPrice, Orders.street, 
    Orders.city, Orders.state, Orders.zipCode, Coupons.couponCode AS couponCode
FROM Orders
INNER JOIN Users ON Orders.userID = Users.userID
INNER JOIN Coupons ON Orders.couponID = Coupons.couponID;

-- get all records from BookOrderDetails table, showing book title instead of book Id
SELECT Books.title AS book, BookOrderDetails.orderID, BookOrderDetails.quantityOrdered, BookOrderDetails.price
FROM BookOrderDetails
INNER JOIN Books ON BookOrderDetails.bookID = Books.bookID;


-- --------------------------------------------------------
-- READ OPERATIONS for dropdowns
-- --------------------------------------------------------

-- get all book IDs and titles to populate the Book dropdown under BookOrderDetails
SELECT bookID, title FROM Books;


-- --------------------------------------------------------
-- CREATE OPERATIONS for BookOrderDetails
-- : denotes a parameter to be provided by the user
-- --------------------------------------------------------
INSERT INTO BookOrderDetails (bookID, orderID, quantityOrdered, price) 
    VALUES (:bookID_Input, :orderID_Input, :quantityOrdered_Input, :price_Input);


-- --------------------------------------------------------
-- UPDATE OPERATIONS for BookOrderDetails
-- : denotes a parameter to be provided by the user
-- --------------------------------------------------------
UPDATE BookOrderDetails 
SET bookID = :book_Input, orderID = :orderID_Input, quantityOrdered = :quantityOrdered_Input, price = :price_Input 
WHERE bookID = :bookID_selected_from_BookOrderDetails_update_form
 AND orderID = :orderID_selected_from_BookOrderDetails_update_form;


-- --------------------------------------------------------
-- DELETE OPERATIONS for BookOrderDetails
-- --------------------------------------------------------
DELETE FROM BookOrderDetails 
WHERE bookID = :bookID_selected_from_browse_BookOrderDetails_page 
 AND orderID = :orderID_selected_from_browse_BookOrderDetails_page;