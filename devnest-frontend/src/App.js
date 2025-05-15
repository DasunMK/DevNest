import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box, IconButton, Typography, Divider } from '@mui/material';  // Importing Typography and Divider
import ChatIcon from '@mui/icons-material/Chat';  // Import the chat icon
import CloseIcon from '@mui/icons-material/Close';  // Import CloseIcon
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toast

// Importing components
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';  // Import Dashboard
import CodePostForm from './components/CodePostForm';  // Form for creating a new code post
import CodePostDisplay from './components/CodePostDisplay'; // To display code posts with syntax highlighting
import CodePostComments from './components/CodePostComments'; // To add comments to code posts
import AllCodePosts from './components/AllCodePosts';  // To display all code posts
import UserManagement from './components/UserManagement'; // Import UserManagement for managing users
import Navbar from './components/Navbar'; // Import Navbar
import Chatbot from './components/chatbot';  // Import the Chatbot component

// Import Material-UI theme provider
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create a custom theme for the app
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const App = () => {
  const location = useLocation();  // Get the current path using useLocation hook
  const [showChatbot, setShowChatbot] = useState(false); // State to toggle the chatbot visibility

  const toggleChatbot = () => {
    setShowChatbot((prevState) => !prevState); // Toggle chatbot visibility
  };

  // Background style for pages other than login
  const backgroundStyle = {
    backgroundImage: "url('/images/background.png')",  // Path to your image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',  // Full viewport height
    backgroundAttachment: 'relative',
  };

  return (
    <div style={location.pathname !== '/login' ? backgroundStyle : {}}> {/* Apply background style here */}
      <ThemeProvider theme={theme}>
        <div>
          <Navbar /> {/* Add the Navbar here */}

          {/* Toast notifications */}
          <ToastContainer />  {/* Add ToastContainer component here */}

          <Routes>
            {/* Redirect to /login when app first loads */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Route for Register page */}
            <Route path="/register" element={<Register />} />

            {/* Route for Login page */}
            <Route path="/login" element={<Login />} />

            {/* Route for Dashboard page */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Route for User Management page */}
            <Route path="/usermanagement" element={<UserManagement />} />

            {/* Route for Creating a new code post */}
            <Route path="/codepost/new" element={<CodePostForm />} />

            {/* Route for Displaying all code posts */}
            <Route path="/codeposts" element={<AllCodePosts />} />

            {/* Route for Displaying a single code post with syntax highlighting */}
            <Route path="/codepost/:id" element={<CodePostDisplay />} />

            {/* Route for adding comments to a specific code post */}
            <Route path="/codepost/:id/comments" element={<CodePostComments />} />
          </Routes>
        </div>

        {/* Render the Chatbot on all pages except /login */}
        {location.pathname !== '/login' && showChatbot && (
          <Box sx={{
            position: 'fixed',
            bottom: 80,  // Adjust the vertical position as needed
            right: 20,   // Position the chatbot next to the chat icon
            width: '350px',  // Increase width for better space
            height: '450px',  // Increase height for more space
            backgroundColor: '#fff',
            boxShadow: 5,
            borderRadius: '12px',
            zIndex: 9999,
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',  // Allow scrolling if the chatbot content exceeds the height
          }}>
            {/* Chatbot Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Chatbot</Typography>
              <IconButton onClick={toggleChatbot}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Divider */}
            <Divider sx={{ marginBottom: 2 }} />

            <Chatbot /> {/* Assuming this is the component */}
          </Box>
        )}

        {/* Chatbot toggle button */}
        {location.pathname !== '/login' && (
          <IconButton
            color="primary"
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              backgroundColor: '#ffff',
              borderRadius: '50%',
              boxShadow: 3,
            }}
            onClick={toggleChatbot}
          >
            <ChatIcon />
          </IconButton>
        )}
      </ThemeProvider>
    </div>
  );
};

const Root = () => (
  <Router>
    <App />
  </Router>
);

export default Root;
