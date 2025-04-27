package com.devnest.devnest_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {

    // This endpoint requires the "ADMIN" role
    @GetMapping("/api/admin/dashboard")
    public String getAdminDashboard() {
        return "Welcome to the Admin Dashboard!";
    }
}
