-- Group 28 
-- Kozy Nook’s Books Sales Management System
-- Xichun Xu & Adrienne Jaimie Paunte

-- PL/SQL for RESET and DELETE

-- DELETE order with orderID 327
DROP PROCEDURE IF EXISTS DeleteOrder327;
DELIMITER //
CREATE PROCEDURE DeleteOrder327()
BEGIN
    DELETE FROM Orders WHERE orderID = 327;
END //
DELIMITER ;