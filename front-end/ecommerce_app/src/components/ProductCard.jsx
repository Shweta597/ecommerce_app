import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ width: 250 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.imageUrl} // Assuming your product has imageUrl field
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          ₹{product.price}
        </Typography>
        <Button component={Link} to={`/product/${product.id}`} variant="contained" size="small" sx={{ mt: 1 }}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
