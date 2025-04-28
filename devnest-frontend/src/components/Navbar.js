import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Added Link import here
import { AppBar, Toolbar, Button, Typography, Container, Box } from '@mui/material';
import { useState, useEffect } from 'react';  // For detecting login state

const Navbar = () => {
  const navigate = useNavigate(); // To navigate after logout
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in by looking for a token in localStorage
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Remove the auth token from localStorage
    localStorage.removeItem('authToken');
    setIsLoggedIn(false); // Update the state to reflect logged-out status
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ color: '#fff' }}>
            DevNest
          </Typography>
          
          <Box>
            {/* Replacing Home button with Dashboard */}
            <Button color="inherit" onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
            
            {isLoggedIn ? (
              <>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
