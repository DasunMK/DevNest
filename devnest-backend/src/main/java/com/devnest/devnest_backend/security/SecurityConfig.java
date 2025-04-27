package com.devnest.devnest_backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for APIs
            .authorizeRequests(auth -> auth
                .requestMatchers("/api/auth/register", "/api/auth/login").permitAll() // Use requestMatchers instead of antMatchers
                .anyRequest().authenticated() // Protect other endpoints
            )
            .formLogin(form -> form
                .loginPage("/login") // Custom login page (if needed)
                .permitAll() // Allow all users to access the login page
            )
            .logout(logout -> logout
                .logoutSuccessUrl("/login?logout") // Redirect after logout
            );
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
