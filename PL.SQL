-- Group 28 
-- Kozy Nook’s Books Sales Management System
-- Xichun Xu & Adrienne Jaimie Paunte

-- PL/SQL for CREATE, UPDATE, DELETE Orders and UPDATE BookOrderDetails


-- #############################
-- CREATE order
-- #############################
DROP PROCEDURE IF EXISTS sp_CreateOrder;

DELIMITER //
CREATE PROCEDURE sp_CreateOrder(
    IN p_userID INT,
    IN p_orderDate DATE,
    IN p_totalPrice DECIMAL(20, 2),
    IN p_street VARCHAR(100),
    IN p_city VARCHAR(50),
    IN p_state VARCHAR(50),
    IN p_zipCode VARCHAR(10),
    IN p_couponID INT,
    OUT p_id INT)
BEGIN
    INSERT INTO Orders (userID, orderDate, totalPrice, street, city, state, zipCode, couponID)
    VALUES (p_userID, p_orderDate, p_totalPrice, p_street, p_city, p_state, p_zipCode, p_couponID);

     -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into p_id;
    -- Display the ID of the last inserted order.
    SELECT LAST_INSERT_ID() AS 'new_id';

END //
DELIMITER ;


-- #############################
-- UPDATE order
-- #############################
DROP PROCEDURE IF EXISTS sp_UpdateOrder;

DELIMITER //
CREATE PROCEDURE sp_UpdateOrder(
    IN p_orderID INT,
    IN p_userID INT,
    IN p_orderDate DATE,
    IN p_totalPrice DECIMAL(20, 2),
    IN p_street VARCHAR(100),
    IN p_city VARCHAR(50),
    IN p_state VARCHAR(50),
    IN p_zipCode VARCHAR(10),
    IN p_couponID INT)

BEGIN
    UPDATE Orders 
    SET orderID = p_orderID, userID = p_userID, orderDate = p_orderDate, totalPrice = p_totalPrice, street = p_street, 
    city = p_city, state = p_state, zipCode = p_zipCode, couponID = p_couponID
    WHERE orderID = p_orderID;
END //

DELIMITER ;


-- #############################
-- DELETE order
-- #############################
DROP PROCEDURE IF EXISTS sp_DeleteOrder;

DELIMITER //
CREATE PROCEDURE sp_DeleteOrder(IN p_orderID INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Roll back the transaction on any error
        ROLLBACK;
        -- Propogate the custom error message to the caller
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Orders WHERE orderID = p_orderID;
    
        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in orders for id: ', p_orderID);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;