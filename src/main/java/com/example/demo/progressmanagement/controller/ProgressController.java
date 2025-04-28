package com.diy.craft.backend.progressmanagement.controller;


import com.diy.craft.backend.progressmanagement.model.Progress;
import com.diy.craft.backend.progressmanagement.service.ProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
@CrossOrigin
public class ProgressController {

    private final ProgressService progressService;

    // ✅ Create Progress
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Progress createProgress(@RequestBody Progress progress) {
        return progressService.createProgress(progress);
    }

    // ✅ Update Progress
    @PutMapping("/{id}")
    public Progress updateProgress(@PathVariable String id, @RequestBody Progress progress) {
        return progressService.updateProgress(id, progress);
    }

    // ✅ Get All Progress
    @GetMapping
    public List<Progress> getProgress(
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) String projectId) {
        return progressService.getProgress(userId, projectId);
    }

    // ✅ Get Single Progress
    @GetMapping("/{id}")
    public Progress getProgressById(@PathVariable String id) {
        return progressService.getProgressById(id);
    }

    // ✅ Delete Progress
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProgress(@PathVariable String id) {
        progressService.deleteProgress(id);
    }
}
