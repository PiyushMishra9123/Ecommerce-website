# 🛒 E-Commerce Website

A **full-stack MERN E-Commerce application** built with **React.js, Node.js, Express.js, and MongoDB**. The project provides a complete foundation for an online shopping platform with user authentication, JWT authorization, product management, shopping cart, order management, and an admin dashboard.

---

## 🚀 Live Project

🌐 **Live Demo:** [E-Commerce Website](https://ecommerce-website-six-beige.vercel.app/)

💻 **Source Code:** [GitHub Repository](https://github.com/PiyushMishra9123/Ecommerce-website)
---

## 📌 About The Project

This project is a full-stack e-commerce platform designed to provide a smooth and user-friendly online shopping experience.

Users can create an account, securely log in, browse products, add products to their cart, and manage their orders.

The application also includes backend APIs and an admin-oriented system for managing products and application data.

---

## ✨ Features

### 👤 User Authentication

* User registration
* User login
* JWT-based authentication
* Protected routes
* Secure authorization

### 🛍️ Product Management

* Product listing
* Product details
* Product management through backend APIs
* Organized product data

### 🛒 Shopping Cart

* Add products to cart
* Manage cart items
* Update cart data
* Remove products from cart

### 📦 Order Management

* Create orders
* Store order information
* Manage order-related data

### 👨‍💼 Admin Dashboard

* Admin-focused management
* Product management
* Application data management
* Protected admin functionality

### 📱 Responsive UI

* Responsive design
* User-friendly interface
* Mobile-friendly layout
* Smooth shopping experience

---

## 🧑‍💻 Tech Stack

### Frontend

* ⚛️ React.js
* 🟨 JavaScript
* 🌐 HTML5
* 🎨 CSS3

### Backend

* 🟢 Node.js
* 🚂 Express.js
* 🔗 REST APIs
* 🔐 JWT Authentication

### Database

* 🍃 MongoDB

### Tools

* Git
* GitHub
* VS Code
* npm

---

## 🏗️ Project Structure

```text
Ecommerce-website/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## 🔄 How The Application Works

```text
User
  │
  ▼
React.js Frontend
  │
  ▼
REST APIs
  │
  ▼
Node.js + Express.js
  │
  ▼
MongoDB Database
```

The frontend communicates with the backend through REST APIs. The Express.js server handles application logic and authentication, while MongoDB is used to store application data.

JWT is used to authenticate users and protect restricted routes.

---

## 🔐 Authentication

The application uses **JWT (JSON Web Token)** for authentication and authorization.

Authentication flow:

1. User creates an account.
2. User logs in using their credentials.
3. Backend validates the credentials.
4. JWT token is generated.
5. Token is used to access protected routes.
6. Authorized users can access restricted functionality.

---

## ⚙️ Getting Started

Follow these steps to run the project locally.

### 1. Clone Repository

```bash
git clone https://github.com/PiyushMishra9123/Ecommerce-website.git
```

### 2. Navigate Into Project

```bash
cd Ecommerce-website
```

---

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

---

### 4. Setup Backend

Open another terminal:

```bash
cd backend
npm install
```

Start the backend using the script configured in the backend `package.json`.

For example:

```bash
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> ⚠️ Never upload your `.env` file or secret keys to GitHub.

---

## 📚 Key Learning Outcomes

Through this project, I gained practical experience in:

* Building full-stack MERN applications
* Developing REST APIs
* React.js frontend development
* Node.js and Express.js backend development
* MongoDB database integration
* JWT authentication and authorization
* Protected routes
* Shopping cart functionality
* Order management
* Admin functionality
* Frontend-backend integration
* Git and GitHub version control

---

## 🔮 Future Improvements

Planned improvements include:

* 💳 Payment Gateway Integration
* 🔎 Advanced Product Search
* 🎯 Product Filtering and Sorting
* ⭐ Product Reviews and Ratings
* 📊 Advanced Admin Analytics
* 📧 Email Notifications
* ❤️ Wishlist Functionality
* 📱 Further UI/UX Improvements
* ☁️ Production Deployment

---

## 👨‍💻 Author

### Piyush Kumar Mishra

Full Stack Developer passionate about building modern, responsive, and scalable web applications.

**GitHub:**
https://github.com/PiyushMishra9123



---

## ⭐ Support

If you find this project useful, feel free to **star ⭐ the repository** and explore the code.

---

## 📄 License

This project is created for **learning and development purposes**.
