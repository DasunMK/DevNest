package com.devnest.devnest_backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.devnest.devnest_backend.model.CodePost;

public interface CodePostRepository extends MongoRepository<CodePost, String> {
    // Custom query methods can be added if needed
}
