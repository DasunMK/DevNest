// src/components/Login.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Stack, Card, styled, Divider } from '@mui/material';
import { toast } from 'react-toastify'; // Import toast
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';  // Import axios to handle HTTP requests

// Styled component for the login card with pink background
const CardStyled = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  //backgroundColor: '#f8bbd0',  // Light pink background for the card
  borderRadius: '10px', // Rounded corners for the card
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  backgroundColor: '#f7f7f7',  // Optional: Background color for the container (you can keep it or modify it)
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = { email, password };

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', userData);
      localStorage.setItem('authToken', response.data.token); // Save JWT token
      toast.success('Login successful!');  // Success toast
    } catch (error) {
      toast.error('Error logging in. Please check your credentials.');  // Error toast
    }
  };

  return (
    <SignUpContainer direction="column" justifyContent="space-between">
      <CardStyled variant="outlined">
        <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
          <TextField
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />
          <Button type="submit" fullWidth variant="contained">
            Login
          </Button>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography sx={{ textAlign: 'center' }}>
            Don't have an account?{' '}
            <Link to="/register" variant="body2" sx={{ alignSelf: 'center' }}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </CardStyled>
    </SignUpContainer>
  );
};

export default Login;
