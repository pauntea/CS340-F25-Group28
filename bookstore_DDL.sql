-- Group 28 
-- Kozy Nook’s Books Sales Management System
-- Xichun Xu & Adrienne Jaimie Paunte

-- 2025-10-30
-- MySQL Workbench Forward Engineering
-- phpMyAdmin SQL Dump
-- Project Step 2 Draft Data Definition Queries and the sample data INSERT statements


SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_xuxic`
--

-- --------------------------------------------------------

--
-- Table structure for table `BookOrderDetails`
--

DROP TABLE IF EXISTS `BookOrderDetails`;
CREATE TABLE `BookOrderDetails` (
  `bookID` int(11) NOT NULL,
  `orderID` int(11) NOT NULL,
  `quantityOrdered` int(11) NOT NULL,
  `price` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `BookOrderDetails`
--

INSERT INTO `BookOrderDetails` (`bookID`, `orderID`, `quantityOrdered`, `price`) VALUES
(47, 327, 1, 5.40),
(47, 1064, 1, 6.00),
(2491, 327, 2, 18.00),
(2491, 472, 1, 15.00),
(3785, 985, 3, 9.00);

-- --------------------------------------------------------

--
-- Table structure for table `Books`
--

DROP TABLE IF EXISTS `Books`;
CREATE TABLE `Books` (
  `bookID` int(11) NOT NULL,
  `genreID` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `author` varchar(100) NOT NULL,
  `isbn` varchar(13) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `totalSold` int(11) NOT NULL,
  `description` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Books`
--

INSERT INTO `Books` (`bookID`, `genreID`, `title`, `author`, `isbn`, `quantity`, `price`, `totalSold`, `description`) VALUES
(47, 1, 'Pride and Prejudice', 'Jane Austen', '9780553213102', 17, 6.00, 23, 'Nominated as one of America’s best-loved novels by PBS’s The Great American Read “It is a truth universally acknowledged, that a single man in possession of a good fortune must be in want of a wife.” So begins Pride and Prejudice, Jane Austen’s witty comedy of manners—one of the most popular novels of all time—that features splendidly civilized sparring between the proud Mr. Darcy and the prejudiced Elizabeth Bennet as they play out their spirited courtship in a series of eighteenth-century drawing-room intrigues. Renowned literary critic and historian George Saintsbury in 1894 declared it the “most perfect, the most characteristic, the most eminently quintessential of its author’s works,” and Eudora Welty in the twentieth century described it as “irresistible and as nearly flawless as any fiction could be.\"'),
(256, 10, 'No Rest for the Wicked', 'Rachel Louise Adams', '9781250362117', 6, 25.00, 2, 'A USA Today Bestseller With an expert hand, Rachel Louise Adams’s debut No Rest for the Wicked reads like an edge of your seat, heart-pounding scary movie. In one Halloween obsessed Midwestern town, everyone’s on red alert after a local politician goes missing. Little do they know it’s only the beginning. It’s been close to twenty years since forensic pathologist Dolores Hawthorne left her hometown of Little Horton, Wisconsin. The town is famous for its Halloween celebrations, but also its history of violent deaths linked to the holiday. To Dolores, it’s the place she fled, family, bad memories, and all. Until the FBI calls to tell her that her father--the former mayor turned US Senator--is missing under mysterious circumstances. Some people count to ten to wake up from a nightmare. Dolores always counts the bones of her head instead: sphenoid, frontal, lacrimal. But no matter how many times she counts them, it doesn’t change the fact that her father is missing, that his final words of warning to her were to trust no one, and that now, the rest of her family is giving Dolores a chilling welcome. With Halloween fast approaching, Dolores must face the past she left behind before it’s too late.'),
(1222, 13, 'The Almanack of Naval Ravikant: A Guide to Wealth and Happiness', 'Eric Jorgenson', '9781544514208', 11, 20.00, 4, 'Getting rich is not just about luck; happiness is not just a trait we are born with. These aspirations may seem out of reach, but building wealth and being happy are skills we can learn. So what are these skills, and how do we learn them? What are the principles that should guide our efforts? What does progress really look like? Naval Ravikant is an entrepreneur, philosopher, and investor who has captivated the world with his principles for building wealth and creating long-term happiness. The Almanack of Naval Ravikant is a collection of Naval’s wisdom and experience from the last ten years, shared as a curation of his most insightful interviews and poignant reflections. This isn’t a how-to book, or a step-by-step gimmick. Instead, through Naval’s own words, you will learn how to walk your own unique path toward a happier, wealthier life. This book has been created as a public service. It is available for free download in pdf and e-reader versions on Navalmanack.com. Naval is not earning any money on this book. Naval has essays, podcasts and more at Nav.al and is on Twitter @Naval.'),
(2491, 1, '1984', 'George Orwell, Thomas Pynchon', '9780452284234', 31, 20.00, 52, 'Written 75 years ago, 1984 was George Orwell’s chilling prophecy about the future. And while 1984 has come and gone, his dystopian vision of a government that will do anything to control the narrative is timelier than ever...This 75th Anniversary Edition includes: • A New Introduction by Dolen Perkins-Valdez, author of Take My Hand, winner of the 2023 NAACP Image Award for Outstanding Literary Work—Fiction • A Foreword by Thomas Pynchon • A New Afterword by Sandra Newman, author of Julia: A Retelling of George Orwell’s 1984 “The Party told you to reject the evidence of your eyes and ears. It was their final, most essential command.” Winston Smith toes the Party line, rewriting history to satisfy the demands of the Ministry of Truth. With each lie he writes, Winston grows to hate the Party that seeks power for its own sake and persecutes those who dare to commit thoughtcrimes. But as he starts to think for himself, Winston can’t escape the fact that Big Brother is always watching...A startling and haunting vision of the world, 1984 is so powerful that it is completely convincing from start to finish. No one can deny the influence of this novel, its hold on the imaginations of multiple generations of readers, or the resiliency of its admonitions—a legacy that seems only to grow with the passage of time. •Nominated as one of America’s best-loved novels by PBS’s The Great American Read•'),
(3785, 8, 'Babel', 'R.F. Kuang', '9780063021426', 17, 10.00, 11, 'Instant #1 New York Times Bestseller from the author of The Poppy War “Absolutely phenomenal. One of the most brilliant, razor-sharp books I\'ve had the pleasure of reading that isn\'t just an alternative fantastical history, but an interrogative one; one that grabs colonial history and the Industrial Revolution, turns it over, and shakes it out.” -- Shannon Chakraborty, bestselling author of The City of Brass From award-winning author R. F. Kuang comes Babel, a thematic response to The Secret History and a tonal retort to Jonathan Strange & Mr. Norrell that grapples with student revolutions, colonial resistance, and the use of language and translation as the dominating tool of the British empire. Traduttore, traditore: An act of translation is always an act of betrayal. 1828. Robin Swift, orphaned by cholera in Canton, is brought to London by the mysterious Professor Lovell. There, he trains for years in Latin, Ancient Greek, and Chinese, all in preparation for the day he’ll enroll in Oxford University’s prestigious Royal Institute of Translation—also known as Babel. Babel is the world\'s center for translation and, more importantly, magic. Silver working—the art of manifesting the meaning lost in translation using enchanted silver bars—has made the British unparalleled in power, as its knowledge serves the Empire’s quest for colonization. For Robin, Oxford is a utopia dedicated to the pursuit of knowledge. But knowledge obeys power, and as a Chinese boy raised in Britain, Robin realizes serving Babel means betraying his motherland. As his studies progress, Robin finds himself caught between Babel and the shadowy Hermes Society, an organization dedicated to stopping imperial expansion. When Britain pursues an unjust war with China over silver and opium, Robin must decide…Can powerful institutions be changed from within, or does revolution always require violence?');

-- --------------------------------------------------------

--
-- Table structure for table `Coupons`
--

DROP TABLE IF EXISTS `Coupons`;
CREATE TABLE `Coupons` (
  `couponID` int(11) NOT NULL,
  `couponCode` varchar(50) NOT NULL,
  `discountType` enum('value','percentage') NOT NULL,
  `discount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Coupons`
--

INSERT INTO `Coupons` (`couponID`, `couponCode`, `discountType`, `discount`) VALUES
(1, 'HAPPYREAD5', 'value', 5),
(2, 'KOZYFORYOU10', 'percentage', 10),
(3, 'KOZYKLASSICS6', 'percentage', 6);

-- --------------------------------------------------------

--
-- Table structure for table `Genres`
--

DROP TABLE IF EXISTS `Genres`;
CREATE TABLE `Genres` (
  `genreID` int(11) NOT NULL,
  `genre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Genres`
--

INSERT INTO `Genres` (`genreID`, `genre`) VALUES
(1, 'Classics'),
(9, 'Fantasy'),
(8, 'Fiction'),
(10, 'Horror'),
(3, 'Romance'),
(13, 'Self Help');

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
CREATE TABLE `Orders` (
  `orderID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `orderDate` date NOT NULL,
  `totalPrice` decimal(20,2) NOT NULL,
  `street` varchar(100) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `zipCode` varchar(10) NOT NULL,
  `couponID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Orders`
--

INSERT INTO `Orders` (`orderID`, `userID`, `orderDate`, `totalPrice`, `street`, `city`, `state`, `zipCode`, `couponID`) VALUES
(327, 2315, '2024-06-23', 41.40, '132 Park Lane Avenue', 'Rochester', 'New York', '14608', 2),
(472, 6578, '2025-04-12', 15.00, '45 Forestville Street', 'Seattle', 'Washington', '98111', 1),
(985, 534, '2025-09-27', 27.00, '70 Creekside Bay', 'Houston', 'Texas', '77012', 2),
(1064, 534, '2025-10-29', 6.00, '193 Sunset Boulevard', 'San Francisco', 'California', '94173', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `userID` int(11) NOT NULL,
  `userName` varchar(100) NOT NULL,
  `email` varchar(320) NOT NULL,
  `phoneNumber` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`userID`, `userName`, `email`, `phoneNumber`) VALUES
(428, 'Madeline_Swift', 'mswift2912@gmail.com', '6204435864'),
(534, 'Cindy_May_Chen', 'businesswithcindy@gmail.com', '7408925372'),
(2315, 'Jonathan_Miller', 'jonamiller1983@outlook.com', '8017561486'),
(6578, 'Kevin_Garcia', 'kevinnnngarcia@gmail.com', '5853424781');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `BookOrderDetails`
--
ALTER TABLE `BookOrderDetails`
  ADD KEY `fk_Books_has_Orders_Orders1_idx` (`orderID`),
  ADD KEY `fk_Books_has_Orders_Books1_idx` (`bookID`);

--
-- Indexes for table `Books`
--
ALTER TABLE `Books`
  ADD PRIMARY KEY (`bookID`),
  ADD UNIQUE KEY `bookID_UNIQUE` (`bookID`),
  ADD KEY `fk_Books_Genres1_idx` (`genreID`);

--
-- Indexes for table `Coupons`
--
ALTER TABLE `Coupons`
  ADD PRIMARY KEY (`couponID`),
  ADD UNIQUE KEY `couponID_UNIQUE` (`couponID`),
  ADD UNIQUE KEY `couponCode_UNIQUE` (`couponCode`);

--
-- Indexes for table `Genres`
--
ALTER TABLE `Genres`
  ADD PRIMARY KEY (`genreID`),
  ADD UNIQUE KEY `genreID_UNIQUE` (`genreID`),
  ADD UNIQUE KEY `genre_UNIQUE` (`genre`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`orderID`),
  ADD UNIQUE KEY `orderID_UNIQUE` (`orderID`),
  ADD KEY `fk_Orders_Coupons1_idx` (`couponID`),
  ADD KEY `fk_Orders_Users1_idx` (`userID`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `userID_UNIQUE` (`userID`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Books`
--
ALTER TABLE `Books`
  MODIFY `bookID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Coupons`
--
ALTER TABLE `Coupons`
  MODIFY `couponID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Genres`
--
ALTER TABLE `Genres`
  MODIFY `genreID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `orderID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `BookOrderDetails`
--
ALTER TABLE `BookOrderDetails`
  ADD CONSTRAINT `fk_Books_has_Orders_Books1` FOREIGN KEY (`bookID`) REFERENCES `Books` (`bookID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Books_has_Orders_Orders1` FOREIGN KEY (`orderID`) REFERENCES `Orders` (`orderID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Books`
--
ALTER TABLE `Books`
  ADD CONSTRAINT `fk_Books_Genres1` FOREIGN KEY (`genreID`) REFERENCES `Genres` (`genreID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `fk_Orders_Coupons1` FOREIGN KEY (`couponID`) REFERENCES `Coupons` (`couponID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Orders_Users1` FOREIGN KEY (`userID`) REFERENCES `Users` (`userID`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


SET FOREIGN_KEY_CHECKS=1;
COMMIT;