-- Group 28 
-- Kozy Nook’s Books Sales Management System
-- Xichun Xu & Adrienne Jaimie Paunte

-- Database Manipulation queries for implemented Project Website using the bookstore database.

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
SELECT Books.title AS book, BookOrderDetails.orderID, BookOrderDetails.quantityOrdered, BookOrderDetails.price
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

-- get all bookIDs and titles to populate the book dropdown under BookOrderDetails
SELECT bookID, title FROM Books;

-- get all orderID to populate the orderID dropdown under BookOrderDetails
SELECT orderID FROM Orders;


-- --------------------------------------------------------
-- CREATE OPERATIONS for all tables
-- : denotes a parameter to be provided by the user
-- --------------------------------------------------------

-- CREATE OPERATION for Users
INSERT INTO Users (userName, email, phoneNumber) 
    VALUES (:userName_Input, :email_Input, :phoneNumber_Input);

-- CREATE OPERATION for Books
INSERT INTO Books (genreID, title, author, isbn, quantity, price, totalSold, description) 
    VALUES (:genreID_Input, :title_Input, :author_Input, :isbn_Input, :quantity_Input, 
            :price_Input, :totalSold_Input, :description_Input);

-- CREATE OPERATION for Orders
INSERT INTO Orders (userID, orderDate, totalPrice, street, city, state, zipCode, couponID) 
    VALUES (:userID_Input, :orderDate_Input, :totalPrice_Input, :street_Input, :city_Input, 
            :state_Input, :zipCode_Input, :couponID_Input);

-- CREATE OPERATION for BookOrderDetails
INSERT INTO BookOrderDetails (bookID, orderID, quantity, price) 
    VALUES (:bookID_Input, :orderID_Input, :quantity_Input, :price_Input);

-- CREATE OPERATION for Genres
INSERT INTO Genres (genre) 
    VALUES (:genre_Input);

-- CREATE OPERATION for Coupons
INSERT INTO Coupons (couponCode, discountType, discount)
    VALUES (:couponCode_Input, :discountType_Input, :discount_Input);


-- --------------------------------------------------------
-- UPDATE OPERATIONS for all tables
-- : denotes a parameter to be provided by the user
-- ---------------------------------------------------------- --------------------------------------------------------

-- UPDATE OPERATION for Users
UPDATE Users
SET userName = :userName_Input, email = :email_Input, phoneNumber = :phoneNumber_Input 
WHERE userID = :userID_selected_from_Users_update_form;

-- UPDATE OPERATION for Books
UPDATE Books
SET genreID = :genreID_Input, title = :title_Input, author = :author_Input, isbn = :isbn_Input, 
    quantity = :quantity_Input, price = :price_Input, totalSold = :totalSold_Input, description = :description_Input 
WHERE bookID = :bookID_selected_from_Books_update_form;

-- UPDATE OPERATION for Orders
UPDATE Orders 
SET orderID = :orderID_Input, userID = :userID_Input, orderDate = :orderDate_Input, totalPrice = :totalPrice_Input, street = :street_Input, 
    city = :city_Input, state = :state_Input, zipCode = :zipCode_Input, couponID = :couponID_Input 
WHERE orderID = :orderID_selected_from_Orders_update_form

-- UPDATE OPERATION for BookOrderDetails
UPDATE BookOrderDetails 
SET bookID = :book_Input, orderID = :orderID_Input, quantityOrdered = :quantityOrdered_Input, price = :price_Input 
WHERE bookID = :bookID_selected_from_BookOrderDetails_update_form
 AND orderID = :orderID_selected_from_BookOrderDetails_update_form;

-- UPDATE OPERATION for Genres
UPDATE Genres
SET genre = :genre_Input
WHERE genreID = :genreID_selected_from_Genres_update_form;

-- UPDATE OPERATION for Coupons
UPDATE Coupons
SET couponCode = :couponCode_Input, discountType = :discountType_Input, discount = :discount_Input
WHERE couponID = :couponID_selected_from_Coupons_update_form;


-- --------------------------------------------------------
-- DELETE OPERATIONS for all tables
-- : denotes a parameter to be provided by the user
-- --------------------------------------------------------

-- DELETE OPERATION for Users
DELETE FROM Users
WHERE userID = :userID_selected_from_browse_Users_page;

-- DELETE OPERATION for Books
DELETE FROM Books
WHERE bookID = :bookID_selected_from_browse_Books_page;

-- DELETE OPERATION for Orders
DELETE FROM Orders
WHERE orderID = :orderID_selected_from_browse_Orders_page;

-- DELETE OPERATION for bookOrderDetails
DELETE FROM BookOrderDetails
WHERE orderID = :orderID_selected_from_browse_Orders_page AND bookID = :bookID_selected_from_browse_BookOrderDetails_page;

-- DELETE OPERATION for Genres
DELETE FROM Genres  
WHERE genreID = :genreID_selected_from_browse_Genres_page;

-- DELETE OPERATION for Coupons
DELETE FROM Coupons
WHERE couponID = :couponID_selected_from_browse_Coupons_page;