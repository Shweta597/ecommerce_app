// src/components/Layout.js
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer'; // optional
import { Box } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box flex="1">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
