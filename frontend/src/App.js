import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { ProductProvider } from './context/ProductContext'; // ✅ Import ProductProvider
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AddProductForm from './pages/AddProductForm';
import ProductDetails from './pages/ProductDetails'; // Import ProductDetails page
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage'; 
import OrderSuccess from './pages/OrderSuccess';
import AdminOrders from './pages/AdminOrders';
import ViewOrders from './pages/ViewOrders'; // Import ViewOrders page  
import OrderDetails from './pages/OrderDetails'; // Import OrderDetails page
// Styles
import AdminOrdersPage from './pages/AdminOrdersPage'; // Import AdminOrdersPage
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <UserProvider>
          <ProductProvider> {/* ✅ Wrap this around routes using useProducts */}
          <CartProvider> {/* ✅ Wrap this around routes using useCart */}
          <OrderProvider>
            <div className="App">
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/add-product" element={<AddProductForm />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/my-orders" element={<ViewOrders />} /> {/* New route for ViewOrders */}
                  <Route path="/order/:id" element={<OrderDetails />} />
                  <Route path="/admin/orders" element={<AdminOrdersPage />} />  
                  <Route path="/admin/orders" element={<AdminOrders />} />
                  <Route path="*" element={<h2>Page Not Found</h2>} />
                </Routes>
              </main>
            </div>
            </OrderProvider>
            </CartProvider>
          </ProductProvider>
        </UserProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
