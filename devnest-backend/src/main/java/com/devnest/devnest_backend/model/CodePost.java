package com.devnest.devnest_backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "codeposts")
public class CodePost {
    @Id
    private String id;
    private String title;
    private String description;
    private String code;
    private String language;
    private String videoUrl;  // Optional for video URL
    private String fileUrl;  // Optional for file upload

    // Getters and Setters
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getCode() {
        return code;
    }
    public void setCode(String code) {
        this.code = code;
    }
    public String getLanguage() {
        return language;
    }
    public void setLanguage(String language) {
        this.language = language;
    }
    public String getVideoUrl() {
        return videoUrl;
    }
    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
    public String getFileUrl() {
        return fileUrl;
    }
    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }
}
