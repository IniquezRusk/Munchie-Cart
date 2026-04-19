# MunchieCart

MunchieCart is a full-stack food ordering web application built for a class project. It allows users to browse meals, customize menu items, add them to a cart, place orders, and view those orders in an admin dashboard. The project uses HTML, CSS, JavaScript, PHP, and MySQL to simulate a real online ordering experience.

## Features

- Browse a styled food menu
- Customize meal ingredients before adding to cart
- Add, remove, and adjust cart quantities
- Submit customer orders through checkout
- Store orders and order items in a MySQL database
- View submitted orders in an admin dashboard
- Update order status (Pending, Completed, Cancelled)
- Delete orders directly from the admin dashboard
- Search and manage orders more easily through the admin view

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** PHP
- **Database:** MySQL
- **Local Development Environment:** XAMPP

## Project Structure

munchie-cart/
├── client/
│   ├── index.html
│   ├── menu.html
│   ├── cart.html
│   ├── customize.html
│   ├── admin.html
│   ├── style.css
│   ├── app.js
│   ├── cart.js
│   └── admin.js
├── server/
│   ├── place_order.php
│   ├── get_orders.php
│   ├── delete_order.php
│   └── update_order_status.php
└── README.md

How It Works
Customer Side

Users can browse menu items, customize ingredients, and add meals to their cart. On the cart page, they can enter customer information and place an order.

Order Processing

When an order is submitted, the frontend sends the cart and customer information to the PHP backend. The backend inserts the order into the orders table and the selected meals into the order_items table.

Admin Dashboard

The admin dashboard fetches all orders from the database and displays customer details, order totals, selected items, and customizations. Admin users can also update order status or delete orders.

Database Tables
orders

Stores customer information and order-level details:

first_name
last_name
email
address_line1
address_line2
phone
total_price
order_date
status
order_items

Stores each item within an order:

order_id
meal_id
meal_name
quantity
price
customizations
Setup Instructions
1. Clone the repository
git clone https://github.com/your-username/munchie-cart.git
2. Move the project into XAMPP

Place the project folder inside:

C:\xampp\htdocs\
3. Start XAMPP

Open XAMPP Control Panel and start:

Apache
MySQL
4. Create the database

Open:
http://localhost/phpmyadmin

Create a database named:
munchiecart

Then import your SQL schema.

5. Run the project
6. 
Open in your browser:

http://localhost/munchie-cart/client/index.html

Admin dashboard:

http://localhost/munchie-cart/client/admin.html
Notes
This project is intended for demonstration and educational purposes.
No real payments are processed.
The admin page is for local/testing use and should not be considered production secure.
Future Improvements
Public deployment with hosted PHP/MySQL support
User authentication for admin access
Search and filtering improvements in the admin dashboard
More advanced order analytics
Better mobile responsiveness
