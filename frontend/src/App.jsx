import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import SellerDashboard from "./pages/SellerDashboard";
import Checkout from "./pages/Checkout";
import CancelOrders from "./pages/CancelOrders";
import ReturnOrders from "./pages/ReturnOrders";
import IncomeAnalytics from "./pages/IncomeAnalytics";
import MyProducts from "./pages/MyProducts";
import CustomerOrders from "./pages/CustomerOrders";
import CustomerOrderDetails from "./pages/CustomerOrderDetails";


function App() {
return ( <BrowserRouter>

  <div className="min-h-screen flex flex-col">

    <Navbar />

    <main className="flex-grow">

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/seller"
  element={
    <ProtectedRoute>
      <SellerDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/checkout"
  element={<Checkout />}
/>

<Route
  path="/cancel-orders"
  element={<CancelOrders />}
/>

<Route
  path="/return-orders"
  element={<ReturnOrders />}
/>

<Route
  path="/income-analytics"
  element={<IncomeAnalytics />}
/>
<Route
  path="/my-products"
  element={
    <ProtectedRoute>
      <MyProducts />
    </ProtectedRoute>
  }
/>
<Route
  path="/customer-orders"
  element={
    <ProtectedRoute>
      <CustomerOrders />
    </ProtectedRoute>
  }
/>

<Route
  path="/customer-orders/:id"
  element={
    <ProtectedRoute>
      <CustomerOrderDetails />
    </ProtectedRoute>
  }
/>


      </Routes>

    </main>

    <Footer />

  </div>

</BrowserRouter>

);
}

export default App;
