import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/cart/Home';
import withAuth from './components/withAuth';
import ProductOverview from './components/cart/ProductOverview'

function App() {
  const AuthenticatedHome = withAuth(Home);
  const AuthenticatedProductOverview = withAuth(ProductOverview)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthenticatedHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/item/:id" element={<AuthenticatedProductOverview />} />
      </Routes>
    </Router>
  );
}

export default App;
