package com.shwetashaw.ecommerce_app.repository;

import com.shwetashaw.ecommerce_app.model.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
