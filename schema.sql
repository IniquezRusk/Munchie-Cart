-- MuchieCart database schematic
-- Tracks the meals, ingredients, orders, and the tracking of orders, uses MariaDB (XAMPP)

CREATE DATABASE munchiecart;
USE munchiecart;

-- Creation of the tables for the database

CREATE TABLE meals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description VARCHAR(255),
    category VARCHAR(50)
);

CREATE TABLE ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    meal_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    default_quantity INT NOT NULL,
    unit VARCHAR(50),
    FOREIGN KEY (meal_id) REFERENCES meals(id)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100),
    address VARCHAR(255),
    total_price DECIMAL(10,2)
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    meal_id INT,
    quantity INT DEFAULT 1,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (meal_id) REFERENCES meals(id)
);