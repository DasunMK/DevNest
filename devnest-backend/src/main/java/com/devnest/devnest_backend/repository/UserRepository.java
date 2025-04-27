package com.devnest.devnest_backend.repository;

import com.devnest.devnest_backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    
    // Find user by email (for login, etc.)
    Optional<User> findByEmail(String email);

    // (You can add more custom queries later if needed)
}