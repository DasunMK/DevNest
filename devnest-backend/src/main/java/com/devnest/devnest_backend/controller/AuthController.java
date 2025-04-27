package com.devnest.devnest_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devnest.devnest_backend.model.User;
import com.devnest.devnest_backend.repository.UserRepository;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Register User
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User userRequest) {
        // Check if email already exists
        if (userRepository.findByEmail(userRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        // Encode password
        String encodedPassword = passwordEncoder.encode(userRequest.getPassword());

        // Assign default role "USER" for normal users
        User newUser = new User();
        newUser.setName(userRequest.getName());
        newUser.setEmail(userRequest.getEmail());
        newUser.setPassword(encodedPassword);
        newUser.setPhone(userRequest.getPhone());
        newUser.setGender(userRequest.getGender());
        newUser.setGithub(userRequest.getGithub());
        newUser.setRoles(Collections.singletonList("USER")); // Default role is USER

        // Save user to database
        userRepository.save(newUser);

        return ResponseEntity.ok("User registered successfully!");
    }

    // Login User
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody User loginRequest) {
        // Authenticate user using Spring Security's AuthenticationManager
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        // If authentication is successful, return a success message
        return ResponseEntity.ok("User logged in successfully!");
    }

    // User Profile (for role-based testing)
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestParam String username, Authentication authentication) {
        // Access the authenticated user's name using Spring Security's Authentication object
        String currentUser = authentication.getName();  // This gets the username of the authenticated user
        return ResponseEntity.ok("Welcome, " + currentUser);
    }
}
