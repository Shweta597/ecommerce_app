package com.shwetashaw.ecommerce_app.controller;

import com.shwetashaw.ecommerce_app.model.ProductCategory;
import com.shwetashaw.ecommerce_app.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class ProductCategoryController {

    @Autowired
    private ProductCategoryService categoryService;

    @GetMapping
    public List<ProductCategory> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public ProductCategory getCategory(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }

    @PostMapping
    public ProductCategory addCategory(@RequestBody ProductCategory category) {
        return categoryService.saveCategory(category);
    }

    @PutMapping
    public ProductCategory updateCategory(@RequestBody ProductCategory category) {
        return categoryService.saveCategory(category);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
    }
}
