// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card, CardContent, CardMedia, Typography, Grid, Box, CircularProgress
} from '@mui/material';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Product Catalog
      </Typography>
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ maxWidth: 345, mx: "auto" }}>
              <CardMedia
                component="img"
                height="180"
                image={product.imageUrl}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>
                  ₹ {product.unitPrice}
                </Typography>
                <Typography variant="caption" display="block">
                  SKU: {product.sku}
                </Typography>
                <Typography variant="caption" display="block">
                  In Stock: {product.unitsInStock}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
