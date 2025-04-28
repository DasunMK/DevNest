
package com.diy.craft.backend.progressmanagement.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "progress")
public class Progress {

    @Id
    private String id;

    private String userId;         // Who is progressing
    private String projectId;      // Which project is related (optional if needed)
    private String description;    // Progress description (250-500 chars)
    private double percentage;     // Progress percentage (0-100)

    private String imageUrl;       // (Optional) Uploaded image link
    private String videoUrl;       // (Optional) Uploaded video link
}

