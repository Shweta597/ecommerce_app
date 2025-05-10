package com.shwetashaw.ecommerce_app.service;

import com.shwetashaw.ecommerce_app.model.Product;
import com.shwetashaw.ecommerce_app.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    /**
     * Fetch all products from the database.
     */
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    /**
     * Fetch a single product by its ID.
     * Returns null if not found.
     */
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    /**
     * Save or update a product.
     */
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    /**
     * Delete a product by its ID.
     */
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    /**
     * Get all products that belong to a specific category.
     */
    public List<Product> getProductsByCategory(String categoryName) {
        return productRepository.findByCategoryCategoryName(categoryName);
    }

    /**
     * Search for products by a keyword in name or description.
     */
    public List<Product> searchProducts(String keyword) {
        return productRepository.searchByKeyword(keyword);
    }

    /**
     * Get paginated list of all products.
     */
    public Page<Product> getProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAll(pageable);
    }

    /**
     * Get paginated list of products by category name.
     */
    public Page<Product> getProductsByCategory(String categoryName, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findByCategoryCategoryName(categoryName, pageable);
    }

    /**
     * Search for products by keyword with pagination support.
     */
    public Page<Product> searchProducts(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.searchByKeyword(keyword, pageable);
    }
}
