import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import Link and useNavigate
import { AppBar, Toolbar, Button, Typography, Container, Box } from '@mui/material';

const Navbar = () => {
  const navigate = useNavigate(); // For navigation after logout
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
            {/* Dashboard button */}
            <Button color="inherit" onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>

            {/* Add New Code Post Button */}
            {isLoggedIn && (
              <Button color="inherit" onClick={() => navigate('/codepost/new')}>
                Add New Code Post
              </Button>
            )}

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
