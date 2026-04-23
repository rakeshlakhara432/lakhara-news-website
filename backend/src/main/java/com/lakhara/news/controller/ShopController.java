package com.lakhara.news.controller;

import com.lakhara.news.dto.ApiResponse;
import com.lakhara.news.entity.Product;
import com.lakhara.news.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/shop")
@CrossOrigin(origins = "*")
public class ShopController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/products")
    public ApiResponse<List<Product>> getAllProducts() {
        return ApiResponse.success(productRepository.findAll(), "Products fetched successfully");
    }

    @PostMapping("/products")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Product> addProduct(@RequestBody Product product) {
        return ApiResponse.success(productRepository.save(product), "Product added successfully");
    }

    @PutMapping("/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Product> updateProduct(@PathVariable String id, @RequestBody Product productDetails) {
        Product product = productRepository.findById(id).orElseThrow();
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setSalePrice(productDetails.getSalePrice());
        product.setStock(productDetails.getStock());
        product.setCategory(productDetails.getCategory());
        product.setImageUrl(productDetails.getImageUrl());
        product.setFeatured(productDetails.isFeatured());
        return ApiResponse.success(productRepository.save(product), "Product updated successfully");
    }

    @DeleteMapping("/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Void> deleteProduct(@PathVariable String id) {
        productRepository.deleteById(id);
        return ApiResponse.success(null, "Product deleted successfully");
    }
}
