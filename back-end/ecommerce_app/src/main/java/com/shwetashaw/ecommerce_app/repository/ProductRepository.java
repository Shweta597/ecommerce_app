package com.shwetashaw.ecommerce_app.repository;

import com.shwetashaw.ecommerce_app.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryCategoryName(String categoryName);
}
