import React from 'react';
import { useCart } from '../context/CartContext';
import {
  Box, Card, CardContent, CardMedia, Typography, IconButton, Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
      {cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        cartItems.map(item => (
          <Card key={item.id} sx={{ display: 'flex', mb: 2, p: 2 }}>
            <CardMedia
              component="img"
              image={item.imageUrl}
              sx={{ width: 120, height: 120, objectFit: 'contain', mr: 2 }}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">{item.description}</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>₹ {item.unitPrice}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                  <RemoveIcon />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={() => removeFromCart(item.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ShoppingCart;
