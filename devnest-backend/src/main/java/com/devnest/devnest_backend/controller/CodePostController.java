package com.devnest.devnest_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devnest.devnest_backend.model.CodePost;
import com.devnest.devnest_backend.repository.CodePostRepository;

@RestController
@RequestMapping("/api/codeposts")
public class CodePostController {

    @Autowired
    private CodePostRepository codePostRepository;

    // Get all code posts
    @GetMapping
    public List<CodePost> getAllCodePosts() {
        return codePostRepository.findAll();
    }

    // Create a new code post
    @PostMapping
    public CodePost createCodePost(@RequestBody CodePost codePost) {
        return codePostRepository.save(codePost);
    }

    // Update an existing code post
    @PutMapping("/{id}")
    public CodePost updateCodePost(@PathVariable String id, @RequestBody CodePost codePost) {
        codePost.setId(id);
        return codePostRepository.save(codePost);
    }

    // Delete a code post
    @DeleteMapping("/{id}")
    public void deleteCodePost(@PathVariable String id) {
        codePostRepository.deleteById(id);
    }
}
