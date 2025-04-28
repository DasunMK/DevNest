package com.diy.craft.backend.progressmanagement.repository;

import com.diy.craft.backend.progressmanagement.model.Progress;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgressRepository extends MongoRepository<Progress, String> {

    List<Progress> findByUserId(String userId);

    List<Progress> findByProjectId(String projectId);
}
