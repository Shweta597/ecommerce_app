import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box, Typography, Card, CardContent, CardMedia,
  CircularProgress, Button
} from '@mui/material';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product details:', err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
  if (!product) return <Typography textAlign="center">Product not found</Typography>;

  return (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ maxWidth: 600, boxShadow: 4 }}>
        <CardMedia
          component="img"
          height="300"
          image={product.imageUrl || "https://via.placeholder.com/300"}
          alt={product.name}
          sx={{ objectFit: 'contain', backgroundColor: '#f0f0f0' }}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>{product.name}</Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>Price: ₹{product.unitPrice}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>SKU: {product.sku}</Typography>
          <Typography variant="body2">Stock: {product.unitsInStock}</Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetails;