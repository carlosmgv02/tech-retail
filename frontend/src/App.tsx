import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/cart/Home';
import withAuth from './components/withAuth';

function App() {
  const AuthenticatedHome = withAuth(Home);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthenticatedHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
