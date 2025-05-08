import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/HomePage';
import ProductDetails from './components/ProductDetails';
import ShoppingCart from './components/ShoppingCart';
import Layout from './components/Layout';
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<ShoppingCart />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
};

export default App;