import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const SearchResults = () => {
  const { searchTerm } = useParams();  // Fetch search term from URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      axios.get(`http://localhost:8080/api/products/search?keyword=${searchTerm}`)
        .then((response) => setProducts(response.data))
        .catch((error) => console.error("Error fetching search results:", error));
    }
  }, [searchTerm]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Search Results for "{searchTerm}"</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
