import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie

function NavBar() {
  const navigate = useNavigate();
  const isLoggedIn = Cookies.get('token');

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Shop
        </Typography>
        {isLoggedIn ? (
          <Button color="inherit" onClick={handleLogout} sx={{ marginLeft: 'auto' }}>Logout</Button>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login" sx={{ marginLeft: 'auto' }}>Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
