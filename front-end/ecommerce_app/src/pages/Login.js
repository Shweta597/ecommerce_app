import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { signUpWithEmail, loginWithEmail, loginWithGoogle } from '../firebase/authUtils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Added name state
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Handle login
  const handleEmailLogin = async () => {
    try {
      await loginWithEmail(email, password);
      navigate('/');
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  // Handle signup with name, email, and password
  const handleEmailSignUp = async () => {
    try {
      await signUpWithEmail(email, password, name); // Pass name to signUpWithEmail
      navigate('/');
    } catch (err) {
      alert('Signup failed: ' + err.message);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      alert('Google login failed: ' + err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>{isLogin ? 'Login' : 'Sign Up'}</Typography>
      
      {/* Name Input (only shown for signup) */}
      {!isLogin && (
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)} // Handle name input
        />
      )}
      
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
      
      {/* Email Login/Sign Up Button */}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={isLogin ? handleEmailLogin : handleEmailSignUp}
      >
        {isLogin ? 'Login' : 'Sign Up'}
      </Button>

      {/* Google Sign Up/Login Button */}
      <Button
        fullWidth
        variant="outlined"
        color="secondary"
        onClick={handleGoogleLogin}
        sx={{ mt: 2 }}
      >
        {isLogin ? 'Login with Google' : 'Sign Up with Google'}
      </Button>

      {/* Toggle between Login and Sign Up */}
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Button color="primary" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
