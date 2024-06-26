import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/cart/Home";
import withAuth from "./components/withAuth";
import ProductOverview from "./components/cart/ProductOverview";
import CheckoutSuccess from "./components/checkout/CheckoutSuccess";
import CheckoutFailed from "./components/checkout/CheckoutFailed";
import NavBar from "./components/Navbar";
import ShoppingHistory from "./components/cart/ShoppingHistory";
import { CartProvider } from "./context/CartContext";
function App() {
  const AuthenticatedHome = withAuth(Home);
  const AuthenticatedProductOverview = withAuth(ProductOverview);
  const AuthenticatedCheckoutSuccess = withAuth(CheckoutSuccess);
  const AuthenticatedCheckoutFailed = withAuth(CheckoutFailed);
  const AuthenticatedShoppingHistory = withAuth(ShoppingHistory);

  return (
    <CartProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<AuthenticatedHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<AuthenticatedCheckoutSuccess />} />
          <Route path="/failed" element={<AuthenticatedCheckoutFailed />} />
          <Route path="/item/:id" element={<AuthenticatedProductOverview />} />
          <Route path="/history" element={<AuthenticatedShoppingHistory />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
