package com.shwetashaw.ecommerce_app.controller;

import com.shwetashaw.ecommerce_app.model.Product;
import com.shwetashaw.ecommerce_app.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.data.domain.Page;
import com.cloudinary.Cloudinary;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private ProductService productService;

    /**
     * Get all products with pagination.
     * Endpoint: GET /api/products?page=0&size=10
     */
    @GetMapping
    public ResponseEntity<Page<Product>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Product> products = productService.getProducts(page, size);
        return ResponseEntity.ok(products);
    }

    /**
     * Get products by category with pagination.
     * Endpoint: GET /api/products/category/{categoryName}?page=0&size=10
     */
    @GetMapping("/category/{categoryName}")
    public ResponseEntity<Page<Product>> getProductsByCategory(
            @PathVariable String categoryName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Product> products = productService.getProductsByCategory(categoryName, page, size);
        return ResponseEntity.ok(products);
    }

    /**
     * Search for products with pagination.
     * Endpoint: GET /api/products/search?keyword=xyz&page=0&size=10
     */
    @GetMapping("/search")
    public ResponseEntity<Page<Product>> searchProducts(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Product> products = productService.searchProducts(keyword, page, size);
        return ResponseEntity.ok(products);
    }

    /**
     * Get a single product by ID.
     * Endpoint: GET /api/products/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return product != null ? ResponseEntity.ok(product) : ResponseEntity.notFound().build();
    }

    /**
     * Add a new product.
     * Endpoint: POST /api/products
     */
    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product savedProduct = productService.saveProduct(product);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    /**
     * Update an existing product.
     * Endpoint: PUT /api/products
     */
    @PutMapping
    public ResponseEntity<Product> updateProduct(@RequestBody Product product) {
        Product updatedProduct = productService.saveProduct(product);
        return ResponseEntity.ok(updatedProduct);
    }

    /**
     * Delete a product by ID.
     * Endpoint: DELETE /api/products/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Product> createProduct(
            @RequestPart("product") Product product,
            @RequestPart("image") MultipartFile imageFile) {

            try {
                String imageUrl = productService.uploadImage(imageFile);
                product.setImageUrl(imageUrl);
        
                Product savedProduct = productService.saveProduct(product);
                return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
            } catch (IOException e) {
                // Log the error if needed
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
    }
}
