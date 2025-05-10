import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card, CardContent, CardMedia, Typography,
  Grid, Box, CircularProgress, Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/api/products/paginated?page=${page}&size=3`)
      .then(response => {
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      }).catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [page]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    navigate('/cart');
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

      {/* Pagination Controls */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="outlined"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          sx={{ mr: 2 }}
        >
          Previous
        </Button>
        <Typography variant="body1" component="span">
          Page {page + 1} of {totalPages}
        </Typography>
        <Button
          variant="outlined"
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(page + 1)}
          sx={{ ml: 2 }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
