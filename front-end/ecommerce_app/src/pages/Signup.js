import React, { useState } from 'react';
import { signUpWithEmail } from '../firebase/authUtils';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Email validation regex
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    try {
      // Ensure all fields are filled and the email is valid
      if (!name || !email || !password) {
        alert('Please fill in all fields');
        return;
      }

      if (!isValidEmail(email)) {
        setError('Please enter a valid email address.');
        return;
      }

      await signUpWithEmail(email, password, name);
      setSuccess(true);
      setError(''); // Clear any previous error messages
      navigate('/'); // Redirect to home page or login page
    } catch (err) {
      setError('Signup failed: ' + err.message); // Display error if signup fails
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>Signup</Typography>

      {/* Name Input */}
      <TextField
        fullWidth
        label="Full Name"
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Email Input */}
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password Input */}
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Signup Button */}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSignup}
      >
        Sign Up
      </Button>

      {/* Error and Success Messages */}
      {error && <Typography color="error" variant="body2">{error}</Typography>}
      {success && (
        <Typography color="primary" variant="body2">
          Signup successful! Please check your email for the verification link.
        </Typography>
      )}
    </Box>
  );
};

export default Signup;
