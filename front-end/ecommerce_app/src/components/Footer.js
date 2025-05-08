// src/components/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#1976d2', color: 'white', py: 2, textAlign: 'center' }}>
      <Typography variant="body2">© 2025 Ecommerce App. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
