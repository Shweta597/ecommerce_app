package com.shwetashaw.ecommerce_app.config;

import com.shwetashaw.ecommerce_app.service.FirebaseAuthFilter;
import com.shwetashaw.ecommerce_app.service.FirebaseTokenVerifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.http.HttpMethod;
@Configuration
public class SecurityConfig {

    @Bean
    public FirebaseTokenVerifier firebaseTokenVerifier() {
        return new FirebaseTokenVerifier(); // or use constructor args if needed
    }

    @Bean
    public FirebaseAuthFilter firebaseAuthFilter(FirebaseTokenVerifier verifier) {
        return new FirebaseAuthFilter(verifier);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, FirebaseAuthFilter firebaseAuthFilter) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
            .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/categories/**").permitAll()
            .requestMatchers("/api/public/**").permitAll()
            .anyRequest().authenticated()
            )
            .addFilterBefore(firebaseAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
