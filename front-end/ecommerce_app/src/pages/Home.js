// src/components/HomePage.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {
  Card, CardContent, CardMedia, Typography,
  Grid, Box, CircularProgress, Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import your cart context

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('http://localhost:8080/api/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      }).catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product); // Add product to cart
    navigate('/cart');  // Redirect to cart
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Product Catalog
      </Typography>
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                maxWidth: 345,
                mx: "auto",
                boxShadow: 3,
                borderRadius: 3,
                transition: 'transform 0.2s',
                cursor: 'pointer',
                '&:hover': { transform: 'scale(1.02)' }
              }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <CardMedia
                component="img"
                height="180"
                image={product.imageUrl || "https://via.placeholder.com/180"}
                alt={product.name}
                sx={{ objectFit: 'contain', backgroundColor: '#f5f5f5' }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {product.description}
                </Typography>
                <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>
                  ₹ {product.unitPrice}
                </Typography>
                <Typography variant="caption" display="block">
                  SKU: {product.sku}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  In Stock: {product.unitsInStock}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
