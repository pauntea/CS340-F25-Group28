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
LEFT JOIN Coupons ON Orders.couponID = Coupons.couponID
ORDER BY Orders.orderID;

-- get all records from BookOrderDetails table, showing book title instead of book Id
SELECT BookOrderDetails.orderID, Books.title AS book, BookOrderDetails.quantityOrdered, BookOrderDetails.price
FROM BookOrderDetails
INNER JOIN Books ON BookOrderDetails.bookID = Books.bookID
ORDER BY BookOrderDetails.orderID;


-- --------------------------------------------------------
-- READ OPERATIONS for dropdowns
-- --------------------------------------------------------

-- get all userIDs and usernames to populate the user dropdown under Orders
SELECT userID, userName FROM Users;

-- get all couponIDs and couponCodes to populate the coupon dropdown under Orders
SELECT couponID, couponCode FROM Coupons;

-- get all bookIDs and titles to populate the bookID dropdown under BookOrderDetails
SELECT bookID, title FROM Books;

-- --------------------------------------------------------
-- CREATE OPERATION for Orders
-- : denotes a parameter to be provided by the user
-- --------------------------------------------------------
INSERT INTO Orders (userID, orderDate, totalPrice, street, city, state, zipCode, couponID) 
    VALUES (:userID_Input, :orderDate_Input, :totalPrice_Input, :street_Input, :city_Input, 
            :state_Input, :zipCode_Input, :couponID_Input);


-- --------------------------------------------------------
-- UPDATE OPERATION for Orders
-- : denotes a parameter to be provided by the user
-- --------------------------------------------------------
UPDATE Orders 
SET orderID = :orderID_Input, userID = :userID_Input, orderDate = :orderDate_Input, totalPrice = :totalPrice_Input, street = :street_Input, 
    city = :city_Input, state = :state_Input, zipCode = :zipCode_Input, couponID = :couponID_Input 
WHERE orderID = :orderID_selected_from_Orders_update_form


-- --------------------------------------------------------
-- UPDATE OPERATION for BookOrderDetails
-- : denotes a parameter to be provided by the user
-- --------------------------------------------------------
UPDATE BookOrderDetails 
SET bookID = :book_Input, orderID = :orderID_Input, quantityOrdered = :quantityOrdered_Input, price = :price_Input 
WHERE bookID = :bookID_selected_from_BookOrderDetails_update_form
 AND orderID = :orderID_selected_from_BookOrderDetails_update_form;


-- --------------------------------------------------------
-- DELETE OPERATION for Orders
-- --------------------------------------------------------
DELETE FROM Orders
WHERE orderID = :orderID_selected_from_browse_Orders_page;