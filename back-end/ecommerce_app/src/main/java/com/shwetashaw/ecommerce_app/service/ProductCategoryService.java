package com.shwetashaw.ecommerce_app.service;

import com.shwetashaw.ecommerce_app.model.ProductCategory;
import com.shwetashaw.ecommerce_app.repository.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductCategoryService {

    @Autowired
    private ProductCategoryRepository categoryRepository;

    public List<ProductCategory> getAllCategories() {
        return categoryRepository.findAll();
    }

    public ProductCategory getCategoryById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    public ProductCategory saveCategory(ProductCategory category) {
        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
