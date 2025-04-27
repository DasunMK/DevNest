package com.devnest.devnest_backend.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    // This endpoint requires authentication
    @GetMapping("/api/user/profile")
    public String getUserProfile(@AuthenticationPrincipal User user) {
        return "Welcome, " + user.getUsername(); // You can return user info or profile details here
    }
}
