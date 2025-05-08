package com.shwetashaw.ecommerce_app.model;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.*;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "product_category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "category_name")
    private String categoryName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    @JsonManagedReference
    private Set<Product> products;
}
