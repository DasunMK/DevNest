import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';  // Import useLocation along with Link and useNavigate
import { AppBar, Toolbar, Button, Typography, Container, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // For mobile menu icon
import { styled } from '@mui/system';

// Styled components for responsiveness
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#1976d2',
  [theme.breakpoints.up('sm')]: {
    padding: '0 20px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0 10px',
  },
}));

const Navbar = () => {
  const navigate = useNavigate(); // For navigation after logout
  const location = useLocation(); // Get current path using useLocation hook
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <StyledAppBar position="sticky">
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo and Title */}
          <Typography variant="h6" sx={{ color: '#fff' }}>
            DevNest
          </Typography>
          
          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            edge="start"
            sx={{ display: { sm: 'none', xs: 'block' } }}
            onClick={toggleMobileMenu}
          >
            <MenuIcon />
          </IconButton>

          {/* Navigation Links for Desktop */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
            {/* Conditionally render Dashboard button */}
            {location.pathname !== '/login' && location.pathname !== '/register' && (
              <Button color="inherit" onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
            )}

            {/* Manage Code Posts Button */}
            {isLoggedIn && (
              <Button color="inherit" onClick={() => navigate('/codeposts')}>
                Manage Code Posts
              </Button>
            )}

            {/* Add New Code Post Button */}
            {isLoggedIn && (
              <Button color="inherit" onClick={() => navigate('/codepost/new')}>
                Add New Code Post
              </Button>
            )}

            {/* Login/Register or Logout buttons */}
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

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <Box
              sx={{
                position: 'absolute',
                top: '60px',
                left: 0,
                width: '100%',
                backgroundColor: '#1976d2',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                padding: '10px',
                boxShadow: '0px 5px 10px rgba(0,0,0,0.3)',
              }}
            >
              {/* Conditionally render Dashboard button in mobile menu */}
              {location.pathname !== '/login' && location.pathname !== '/register' && (
                <Button color="inherit" onClick={() => navigate('/dashboard')}>
                  Dashboard
                </Button>
              )}

              {/* Manage Code Posts Button */}
              {isLoggedIn && (
                <Button color="inherit" onClick={() => navigate('/codeposts')}>
                  Manage Code Posts
                </Button>
              )}

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
          )}
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;
