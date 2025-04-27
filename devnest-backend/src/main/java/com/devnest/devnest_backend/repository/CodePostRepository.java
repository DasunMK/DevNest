// src/repository/CodePostRepository.java

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CodePostRepository extends MongoRepository<CodePost, String> {
    // Add custom queries if needed (e.g., find by userId, language, etc.)
}
