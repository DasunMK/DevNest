package com.diy.craft.backend.progressmanagement.service;

import com.diy.craft.backend.progressmanagement.model.Progress;
import com.diy.craft.backend.progressmanagement.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProgressService {

    @Autowired
    private ProgressRepository progressRepository;

    // ✅ Create Progress
    public Progress createProgress(Progress progress) {
        validateProgress(progress);
        return progressRepository.save(progress);
    }

    // ✅ Update Progress
    public Progress updateProgress(String id, Progress progress) {
        Progress existingProgress = progressRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Progress not found"));

        validateProgress(progress);

        existingProgress.setDescription(progress.getDescription());
        existingProgress.setPercentage(progress.getPercentage());
        existingProgress.setImageUrl(progress.getImageUrl());
        existingProgress.setVideoUrl(progress.getVideoUrl());

        return progressRepository.save(existingProgress);
    }

    // ✅ Get All Progress (Optional filters)
    public List<Progress> getProgress(String userId, String projectId) {
        if (userId != null) {
            return progressRepository.findByUserId(userId);
        } else if (projectId != null) {
            return progressRepository.findByProjectId(projectId);
        } else {
            return progressRepository.findAll();
        }
    }

    // ✅ Get Single Progress
    public Progress getProgressById(String id) {
        return progressRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Progress not found"));
    }

    // ✅ Delete Progress
    public void deleteProgress(String id) {
        Progress progress = progressRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Progress not found"));

        progressRepository.delete(progress);
    }

    // ✅ Validation
    private void validateProgress(Progress progress) {
        if (progress.getDescription() == null || progress.getDescription().length() < 10 || progress.getDescription().length() > 500) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Description must be between 10 and 500 characters");
        }

        if (progress.getPercentage() < 0 || progress.getPercentage() > 100) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Percentage must be between 0 and 100");
        }

        if (progress.getImageUrl() != null && !(progress.getImageUrl().endsWith(".jpg") || progress.getImageUrl().endsWith(".png"))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only JPG or PNG images allowed");
        }

        if (progress.getVideoUrl() != null && !progress.getVideoUrl().endsWith(".mp4")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only MP4 videos allowed");
        }
    }
}
