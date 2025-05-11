import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Box, Typography, Button, Grid, CircularProgress } from '@mui/material';

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/api/products/category/${categoryName}?page=${page}&size=3`)
      .then(response => {
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching category products:", error);
        setLoading(false);
      });
  }, [categoryName, page]);

  const handlePrev = () => setPage(prev => Math.max(prev - 1, 0));
  const handleNext = () => setPage(prev => Math.min(prev + 1, totalPages - 1));

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Products in {categoryName}
      </Typography>
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" mt={4} gap={2}>
        <Button variant="contained" onClick={handlePrev} disabled={page === 0}>
          Previous
        </Button>
        <Typography variant="body1">Page {page + 1} of {totalPages}</Typography>
        <Button variant="contained" onClick={handleNext} disabled={page >= totalPages - 1}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default CategoryProducts;
