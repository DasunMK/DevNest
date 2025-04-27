package com.devnest.devnest_backend.model;

import java.time.Instant;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users") // MongoDB collection name
public class User {

    @Id
    private String id; // MongoDB _id

    private String name;

    private String email;

    private String password; // Stored as a hashed password

    private List<String> roles; // Example: ["USER"], ["ADMIN"]

    private Profile profile; // Embedded profile document

    private Instant registeredAt = Instant.now(); // Registration timestamp

    // --- Constructors ---
    public User() {}

    public User(String name, String email, String password, List<String> roles, Profile profile) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.profile = profile;
    }

    // --- Getters and Setters ---

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public List<String> getRoles() {
        return roles;
    }
    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
    public Profile getProfile() {
        return profile;
    }
    public void setProfile(Profile profile) {
        this.profile = profile;
    }
    public Instant getRegisteredAt() {
        return registeredAt;
    }
    public void setRegisteredAt(Instant registeredAt) {
        this.registeredAt = registeredAt;
    }

    // --- Inner Profile class ---
    public static class Profile {
        private String bio;
        private String github;
        private String avatarUrl;

        // Constructors
        public Profile() {}

        public Profile(String bio, String github, String avatarUrl) {
            this.bio = bio;
            this.github = github;
            this.avatarUrl = avatarUrl;
        }

        // Getters and Setters
        public String getBio() {
            return bio;
        }
        public void setBio(String bio) {
            this.bio = bio;
        }
        public String getGithub() {
            return github;
        }
        public void setGithub(String github) {
            this.github = github;
        }
        public String getAvatarUrl() {
            return avatarUrl;
        }
        public void setAvatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
        }
    }
}