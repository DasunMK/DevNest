// src/model/CodePost.java

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "codePosts")
public class CodePost {
    private String id;
    private String userId; // To associate the post with a user
    private String title;
    private String description;  // Optional description explaining the code
    private String code; // The code snippet (could be a large text for code)
    private String language; // Programming language for syntax highlighting
    private String videoUrl; // Optional link to a video
    private String fileUrl; // Optional URL to the project file
    private List<String> comments; // List of comments on the post

    // Getters and Setters
}
