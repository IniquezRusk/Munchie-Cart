-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 21, 2026 at 09:08 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `munchiecart`
--

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `id` int(11) NOT NULL,
  `meal_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `default_quantity` int(11) NOT NULL,
  `unit` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`id`, `meal_id`, `name`, `default_quantity`, `unit`) VALUES
(1, 1, 'Chicken', 1, 'serving'),
(2, 1, 'Rice', 1, 'cup'),
(3, 1, 'Broccoli', 1, 'serving');

-- --------------------------------------------------------

--
-- Table structure for table `meals`
--

CREATE TABLE `meals` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meals`
--

INSERT INTO `meals` (`id`, `name`, `price`, `description`, `category`) VALUES
(1, 'Chicken Bowl', 10.99, 'Grilled chicken with rice and vegetables', 'Main'),
(2, 'Beef Bowl', 11.99, 'Seasoned beef with rice and toppings', 'Main'),
(3, 'Salmon Plate', 13.99, 'Grilled salmon with sides', 'Main'),
(4, 'Breakfast Plate', 8.99, 'Eggs, toast, sausage, bacon, biscuits, and pancakes', 'Main'),
(5, 'Fitness Wrap', 9.99, 'Low calorie wrap with lean protein', 'Main'),
(6, 'Chicken Alfredo', 12.99, 'Creamy pasta with grilled chicken', 'Main'),
(7, 'Shrimp Pasta', 13.49, 'Shrimp with garlic butter pasta', 'Main'),
(8, 'Turkey Burger', 10.49, 'Lean turkey burger with toppings', 'Main'),
(9, 'French Fries', 3.99, 'Crispy golden fries', 'Side'),
(10, 'Sweet Potato Fries', 4.49, 'Sweet and crispy fries', 'Side'),
(11, 'Steamed Broccoli', 3.49, 'Fresh steamed broccoli', 'Side'),
(12, 'Corn', 2.99, 'Buttery corn', 'Side'),
(13, 'Green Beans', 3.49, 'Seasoned green beans', 'Side'),
(14, 'Mashed Potatoes', 3.99, 'Creamy mashed potatoes', 'Side'),
(15, 'Side Salad', 4.99, 'Fresh greens with dressing', 'Side'),
(16, 'Chocolate Cake', 5.99, 'Rich chocolate layered cake', 'Dessert'),
(17, 'Cheesecake', 5.99, 'Classic creamy cheesecake', 'Dessert'),
(18, 'Brownie', 3.99, 'Fudgy chocolate brownie', 'Dessert'),
(19, 'Ice Cream', 3.49, 'Vanilla or chocolate ice cream', 'Dessert'),
(20, 'Apple Pie', 4.99, 'Warm apple pie', 'Dessert'),
(21, 'Water', 1.49, 'Bottled water', 'Drink'),
(22, 'Coke', 2.49, 'Classic Coca-Cola', 'Drink'),
(23, 'Sprite', 2.49, 'Lemon-lime soda', 'Drink'),
(24, 'Orange Juice', 3.49, 'Fresh orange juice', 'Drink'),
(25, 'Iced Tea', 2.99, 'Sweet iced tea', 'Drink'),
(26, 'Protein Shake', 4.99, 'High protein shake', 'Drink'),
(27, 'Smoothie', 5.49, 'Fruit blended smoothie', 'Drink'),
(28, 'Steak Plate', 18.99, 'Grilled steak served with sides', 'Main'),
(29, 'Classic Burger', 8.99, 'Juicy beef burger with lettuce, tomato, and cheese', 'Main'),
(30, 'Chicken Tenders', 7.99, 'Crispy fried chicken tenders with dipping sauce', 'Main'),
(31, 'Chicken Legs', 6.99, 'Seasoned baked chicken legs', 'Main'),
(32, 'BBQ Ribs', 16.99, 'Slow cooked ribs with BBQ sauce', 'Main');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address_line1` varchar(255) NOT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(20) NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `first_name`, `last_name`, `email`, `address_line1`, `address_line2`, `phone`, `total_price`, `order_date`, `status`) VALUES
(1, 'Iniquez', 'Rusk', 'iniquezrusk@gmail.com', '9490 E Valley Ranch Pkwy', 'Apt 1089', '6827728446', 10.99, '2026-04-19 13:37:35', 'Pending'),
(2, 'Iniquez', 'Rusk', 'iniquezrusk@gmail.com', '9490 E Valley Ranch Pkwy', 'Apt 1089', '6827728446', 3.99, '2026-04-19 13:38:30', 'Completed'),
(6, 'Iniquez', 'Rusk', 'iniquezrusk@gmail.com', '9490 E Valley Ranch Pkwy', 'Apt 1089', '6827728446', 42.97, '2026-04-19 15:16:08', 'Cancelled'),
(8, 'Mark', 'Davis', 'markdavis15@gmail.com', '123 Plae Grownd Stret', '', '51515151515', 8.99, '2026-04-20 03:42:07', 'Pending'),
(9, 'Iniquez', 'Rusk', 'iniquezrusk@gmail.com', '184 Clark Street', '', '6823814243', 3.99, '2026-04-21 17:37:59', 'Pending'),
(10, 'Iniquez', 'Rusk', 'iniquezrusk@gmail.com', '184 Clark Street', '', '6823814243', 4.49, '2026-04-21 18:36:38', 'Pending'),
(11, 'Iniquez', 'Rusk', 'iniquezrusk@gmail.com', '184 Clark Street', '', '6823814243', 4.49, '2026-04-21 18:39:01', 'Pending'),
(13, 'Iniquez', 'Rusk', 'iniquezrusk@gmail.com', '184 Clark Street', '', '6823814243', 4.49, '2026-04-21 18:45:17', 'Pending'),
(14, 'Kendra', 'Nelson', 'knelson14@gmail.com', '9944 Kennadale Yd', 'Apt 1234', '1728213432', 18.96, '2026-04-21 18:48:20', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `meal_id` int(11) NOT NULL,
  `meal_name` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price` decimal(10,2) NOT NULL,
  `customizations` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `meal_id`, `meal_name`, `quantity`, `price`, `customizations`) VALUES
(1, 1, 1, 'Chicken Bowl', 1, 10.99, '[\"No Chicken\",\"No Sweet Potatoes\"]'),
(6, 6, 28, 'Steak Plate', 2, 18.99, '[]'),
(7, 6, 15, 'Side Salad', 1, 4.99, '[]'),
(11, 8, 4, 'Breakfast Plate', 1, 8.99, '[\"No Biscuits\"]'),
(12, 9, 9, 'French Fries', 1, 3.99, '[]'),
(13, 10, 10, 'Sweet Potato Fries', 1, 4.49, '[]'),
(14, 11, 10, 'Sweet Potato Fries', 1, 4.49, '[]'),
(16, 13, 10, 'Sweet Potato Fries', 1, 4.49, '[]'),
(17, 14, 1, 'Chicken Bowl', 1, 10.99, '[\"No Sweet Potatoes\",\"No Sauce\"]'),
(18, 14, 12, 'Corn', 1, 2.99, '[]'),
(19, 14, 13, 'Green Beans', 1, 3.49, '[]'),
(20, 14, 21, 'Water', 1, 1.49, '[]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_meal` (`meal_id`);

--
-- Indexes for table `meals`
--
ALTER TABLE `meals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `meal_id` (`meal_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `meals`
--
ALTER TABLE `meals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD CONSTRAINT `fk_meal` FOREIGN KEY (`meal_id`) REFERENCES `meals` (`id`),
  ADD CONSTRAINT `ingredients_ibfk_1` FOREIGN KEY (`meal_id`) REFERENCES `meals` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`meal_id`) REFERENCES `meals` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
