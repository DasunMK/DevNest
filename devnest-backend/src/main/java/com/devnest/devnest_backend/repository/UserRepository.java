package com.devnest.devnest_backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.devnest.devnest_backend.model.User;

public interface UserRepository extends MongoRepository<User, String> {
}
