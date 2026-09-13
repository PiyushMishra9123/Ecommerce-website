🛒 ShopKart - MERN E-Commerce Website

A full-stack E-Commerce web application built using the MERN stack.
This project provides a complete online shopping experience with user
authentication, product management, shopping cart, order management,
payment integration, and admin functionality.

🌐 Live Demo

Live Website:
https://ecommerce-website-six-beige.vercel.app/

Backend API:
https://ecommerce-website-00z8.onrender.com/

GitHub Repository:
https://github.com/PiyushMishra9123/Ecommerce-website

✨ Features

🔐 User Authentication

User registration

User login

JWT-based authentication

Secure password hashing

Protected routes

Role-based authorization

🛍️ Product Management

View products

View product details

Product categories

Add and manage products

Admin product management

🛒 Shopping Cart

Add products to cart

Remove products from cart

Update product quantity

View cart items

Calculate total price

📦 Order Management

Create orders

Store order information

View order details

Manage customer orders

💳 Payment Integration

Razorpay payment gateway integration

Payment order creation

Payment verification

Secure backend payment handling

Payment functionality is currently configured for development/testing
purposes.

👨‍💼 Admin Dashboard

Admin authentication

Manage products

Manage application data

Protected admin functionality

📱 Responsive Design

Responsive user interface

Mobile-friendly design

Clean navigation

User-friendly shopping experience

🧑‍💻 Tech Stack

Frontend

React.js

JavaScript

HTML5

CSS3

Vite

Axios

React Router

Backend

Node.js

Express.js

REST APIs

JWT

bcryptjs

Multer

Database

MongoDB

MongoDB Atlas

Mongoose

Payment

Razorpay

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

Tools

Git

GitHub

VS Code

Thunder Client

🏗️ Project Structure

Ecommerce-website/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md

🔄 How It Works

The application follows a client-server architecture.

The user interacts with the React frontend.

The frontend sends requests to the Express.js backend.

The backend processes requests and handles business logic.

JWT is used for authentication and authorization.

MongoDB Atlas stores users, products, and order data.

Razorpay handles payment-related operations.

The backend sends responses back to the frontend.

The frontend displays the required information to the user.

🚀 Getting Started

Prerequisites

Make sure you have the following installed:

Node.js

npm

Git

MongoDB or MongoDB Atlas

VS Code

1. Clone the Repository

git clone https://github.com/PiyushMishra9123/Ecommerce-website.git

Navigate to the project:

cd Ecommerce-website

2. Setup Frontend

cd frontend

Install dependencies:

npm install

Start the frontend:

npm run dev

Frontend will run on:

http://localhost:5173

3. Setup Backend

Open another terminal and run:

cd Ecommerce-website/backend

Install dependencies:

npm install

Start the backend:

npm start

Backend will run on:

http://localhost:5000

🔐 Environment Variables

Create a .env file inside the backend folder.

Example:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret

Do not upload .env to GitHub.

Make sure .gitignore contains:

.env
node_modules/

🔗 API Modules

The backend provides REST APIs for:

Module     Description

Users      Registration, login and authentication
Products   Product management and product retrieval
Orders     Order creation and order management
Payment    Razorpay payment operations
Upload     Image and file upload functionality

🧪 Testing

The application can be tested using:

Browser

Thunder Client

Postman

Important flows:

User Registration

User Login

Product Listing

Product Details

Add to Cart

Cart Management

Order Creation

Payment

Admin Operations

☁️ Deployment

The application is deployed using cloud services.

Frontend

Vercel

https://ecommerce-website-six-beige.vercel.app/

Backend

Render

https://ecommerce-website-00z8.onrender.com/

Database

MongoDB Atlas

The production backend connects to MongoDB Atlas using environment
variables.

🎯 Learning Outcomes

Through this project, I gained practical experience in:

Full-stack MERN development

React.js development

REST API development

Node.js and Express.js

MongoDB and Mongoose

JWT authentication

Role-based authorization

Password hashing

Shopping cart implementation

Order management

Payment gateway integration

File upload handling

Git and GitHub

Cloud deployment

Connecting frontend and backend in production

🔮 Future Improvements

Advanced product search

Product filtering and sorting

Product reviews and ratings

Wishlist functionality

Advanced admin analytics

Email notifications

Order tracking

Invoice generation

Cloud image storage

Improved UI/UX

Real-time order notifications

👨‍💻 Author

Piyush Kumar Mishra

B.Tech Computer Science & Engineering Graduate

GitHub

https://github.com/PiyushMishra9123

LinkedIn

https://www.linkedin.com/in/Piyush-Mishra-284585297

⭐ Support

If you find this project useful or interesting, consider giving the
repository a star ⭐.

📄 License

This project is created for learning, development, and portfolio
purposes.