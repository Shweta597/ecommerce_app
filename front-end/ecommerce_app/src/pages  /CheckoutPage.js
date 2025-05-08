import React from 'react';
import {
  Box, Typography, TextField, Grid, Paper, Button, Divider
} from '@mui/material';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { cartItems, totalAmount } = useCart();

  const handlePurchase = () => {
    alert("Purchase successful!");
    // Further logic like order submission can go here
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }} elevation={3}>
            <Typography variant="h6">Customer Information</Typography>
            <TextField fullWidth label="First Name" margin="normal" />
            <TextField fullWidth label="Last Name" margin="normal" />
            <TextField fullWidth label="Email" margin="normal" />
            <TextField fullWidth label="Mobile Number" margin="normal" />

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Shipping Address</Typography>
            <TextField fullWidth label="Address Line 1" margin="normal" />
            <TextField fullWidth label="Address Line 2" margin="normal" />
            <TextField fullWidth label="City" margin="normal" />
            <TextField fullWidth label="State" margin="normal" />
            <TextField fullWidth label="Postal Code" margin="normal" />

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Payment</Typography>
            <TextField fullWidth label="Credit Card Number" margin="normal" />
            <TextField fullWidth label="Expiry Date (MM/YY)" margin="normal" />
            <TextField fullWidth label="CVV" margin="normal" />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }} elevation={3}>
            <Typography variant="h6" gutterBottom>Review Your Order</Typography>
            {cartItems.map(item => (
              <Box key={item.id} sx={{ my: 2 }}>
                <Typography variant="body1">{item.name} x {item.quantity}</Typography>
                <Typography variant="body2">₹ {item.unitPrice} each</Typography>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Total Amount: ₹ {totalAmount}</Typography>
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handlePurchase}>
              Purchase
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutPage;