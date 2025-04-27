// src/controller/CodePostController.java

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/codeposts")
public class CodePostController {

    @Autowired
    private CodePostRepository codePostRepository;

    // Create a new code post
    @PostMapping
    public ResponseEntity<CodePost> createPost(@RequestBody CodePost codePost) {
        CodePost savedPost = codePostRepository.save(codePost);
        return ResponseEntity.ok(savedPost);
    }

    // Get all code posts
    @GetMapping
    public List<CodePost> getAllPosts() {
        return codePostRepository.findAll();
    }

    // Get a single code post by ID
    @GetMapping("/{id}")
    public ResponseEntity<CodePost> getPostById(@PathVariable String id) {
        return codePostRepository.findById(id)
                .map(post -> ResponseEntity.ok(post))
                .orElse(ResponseEntity.notFound().build());
    }

    // Add a comment to a code post
    @PostMapping("/{id}/comments")
    public ResponseEntity<CodePost> addComment(@PathVariable String id, @RequestBody String comment) {
        return codePostRepository.findById(id)
                .map(post -> {
                    post.getComments().add(comment);
                    codePostRepository.save(post);
                    return ResponseEntity.ok(post);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
