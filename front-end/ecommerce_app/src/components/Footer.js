import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ padding: "20px", textAlign: "center" }}>
      <p>© 2025 Your Ecommerce Site</p>
      <Link to="/upload-product">
        <button style={{ padding: "10px 20px", fontSize: "16px" }}>
          Upload New Product
        </button>
      </Link>
    </footer>
  );
};

export default Footer;
