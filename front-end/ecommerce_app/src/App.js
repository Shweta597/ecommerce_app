import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import ShoppingCart from './components/ShoppingCart';
import Layout from './components/Layout';
import { CartProvider } from './context/CartContext';
import CategoryProducts from './components/CategoryProducts';
import SearchResults from './pages/SearchResults';
import ProductForm from './pages/ProductForm';
import Footer from './components/Footer';
import Login from './pages/Login'; 

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
            <Route path="/search/:searchTerm" element={<SearchResults />} />
            <Route path="/upload-product" element={<ProductForm />} />
            <Route path="/login" element={<Login />} /> 
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
};

export default App;
