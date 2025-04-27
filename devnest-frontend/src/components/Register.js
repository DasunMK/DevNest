// src/components/Register.js
import React, { useState } from 'react';
import { Box, Button, Checkbox, CssBaseline, Divider, FormControl, FormLabel, FormControlLabel, TextField, Typography, Stack, Card, styled } from '@mui/material';
import { Google as GoogleIcon, Facebook as FacebookIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';  // Import toast
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

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
  
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
   // Light pink color
}));

export default function Register(props) {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [github, setGithub] = useState('');

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const name = document.getElementById('name');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    if (nameError || emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      phone: phone,
      gender: gender,
      github: github,
    });
    toast.success("User registered successfully!");
  };

  return (
    <SignUpContainer direction="column" justifyContent="space-between">
      <CardStyled variant="outlined">
        <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl>
            <FormLabel htmlFor="name">Full name</FormLabel>
            <TextField
              autoComplete="name"
              name="name"
              required
              fullWidth
              id="name"
              placeholder="Jon Snow"
              error={nameError}
              helperText={nameErrorMessage}
              color={nameError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              required
              fullWidth
              id="email"
              placeholder="your@email.com"
              name="email"
              autoComplete="email"
              variant="outlined"
              error={emailError}
              helperText={emailErrorMessage}
              color={emailError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              required
              fullWidth
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="new-password"
              variant="outlined"
              error={passwordError}
              helperText={passwordErrorMessage}
              color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <TextField
            fullWidth
            type="text"
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <FormControl>
            <FormLabel htmlFor="gender">Gender</FormLabel>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              style={{ padding: '10px 16px', fontSize: '16px' }} // Increase height using padding
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </FormControl>
          <TextField
            fullWidth
            type="text"
            label="GitHub Username"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />

          <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
            Sign up
          </Button>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert('Sign up with Google')}
            startIcon={<GoogleIcon />}
          >
            Sign up with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert('Sign up with Facebook')}
            startIcon={<FacebookIcon />}
          >
            Sign up with Facebook
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Link to="/login" variant="body2" sx={{ alignSelf: 'center' }}>
              Sign in
            </Link>
          </Typography>
        </Box>
      </CardStyled>
    </SignUpContainer>
  );
}
