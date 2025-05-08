import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages  /HomePage';
import ProductDetails from './pages  /ProductDetailsPage';
import ShoppingCart from './components/ShoppingCart';
import Layout from './components/Layout';
import { CartProvider } from './context/CartContext';
import CategoryProducts from './components/CategoryProducts';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/category/:categoryName" element={<CategoryProducts />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
};

export default App;
