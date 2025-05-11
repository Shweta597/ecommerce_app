package com.shwetashaw.ecommerce_app.repository;

import com.shwetashaw.ecommerce_app.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductRepository extends JpaRepository<Product, Long> {

    /**
     * Get paginated products by category name.
     */
    Page<Product> findByCategoryCategoryName(String categoryName, Pageable pageable);

    /**
     * Search for products by keyword in name or description (case-insensitive, paginated).
     */
    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Product> searchByKeyword(String keyword, Pageable pageable);
}
