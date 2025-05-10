import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Grid, Typography, CircularProgress, Button, Card, CardContent, CardMedia
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const SearchResults = () => {
  const { searchTerm } = useParams();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/api/products/paginated?page=${page}&size=1&keyword=${searchTerm}`)
      .then(response => {
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      }).catch(error => {
        console.error("Search error:", error);
        setLoading(false);
      });
  }, [searchTerm, page]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    navigate('/cart');
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Search Results for "{searchTerm}"
      </Typography>
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${product.id}`)}>
              <CardMedia component="img" height="180" image={product.imageUrl || "https://via.placeholder.com/180"} />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography>₹ {product.unitPrice}</Typography>
                <Button variant="contained" onClick={(e) => handleAddToCart(e, product)}>Add to Cart</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</Button>
        <Typography component="span" sx={{ mx: 2 }}>Page {page + 1} of {totalPages}</Typography>
        <Button disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>Next</Button>
      </Box>
    </Box>
  );
};

export default SearchResults;
