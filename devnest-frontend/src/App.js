import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toast

// Importing components
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';  // Import Dashboard
import ProtectedRoute from './components/ProtectedRoute';  // Protected route to guard the Dashboard
import CodePostForm from './components/CodePostForm';  // Form for creating a new code post
import CodePostDisplay from './components/CodePostDisplay'; // To display code posts with syntax highlighting
import CodePostComments from './components/CodePostComments'; // To add comments to code posts
import AllCodePosts from './components/AllCodePosts';  // To display all code posts

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
  return (
    <ThemeProvider theme={theme}> {/* Wrap your app with ThemeProvider */}
      <Router>
        <div>
          {/* Toast notifications */}
          <ToastContainer />  {/* Add ToastContainer component here */}

          <Routes>
            {/* Route for Register page */}
            <Route path="/register" element={<Register />} />

            {/* Route for Login page */}
            <Route path="/login" element={<Login />} />

            {/* ProtectedRoute for Dashboard page */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />  {/* Show the Dashboard component */}
              </ProtectedRoute>
            } />

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
      </Router>
    </ThemeProvider>  
  );
};

export default App;
