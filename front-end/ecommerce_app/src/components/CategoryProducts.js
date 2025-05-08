import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard'; // Or however you render a single product

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/category/${categoryName}`)
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching category products:", error));
  }, [categoryName]);

  return React.createElement(
    'div',
    { style: { padding: '2rem' } },
    React.createElement('h2', null, `Products in ${categoryName}`),
    React.createElement(
      'div',
      { style: { display: 'flex', flexWrap: 'wrap', gap: '1rem' } },
      products.map(product =>
        React.createElement(ProductCard, { key: product.id, product: product })
      )
    )
  );
};

export default CategoryProducts;
