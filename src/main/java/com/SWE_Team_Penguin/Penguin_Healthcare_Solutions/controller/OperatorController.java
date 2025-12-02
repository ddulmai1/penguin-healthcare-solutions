package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.controller;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Operator;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services.OperatorService;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;



@RestController
@RequestMapping("/api/operators")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"}, allowCredentials = "true")
//@CrossOrigin(origins = "http://localhost:5173")
public class OperatorController {

    @Autowired
    private OperatorService operatorService;

    // Authenticate user by username and password
    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthRequest request) {
        System.out.println("Authenticating user: " + request.getUsername());
        for (Operator op : operatorService.getAllOperators()) {
            if (op.getUsername().equals(request.getUsername()) && op.getPassword().equals(request.getPassword())) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("role", op.getRole().toString());
                response.put("username", op.getUsername());
                response.put("firstName", op.getFirstName());
                return ResponseEntity.ok(response);
            }
        }
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", "Invalid credentials");
        return ResponseEntity.badRequest().body(response);
    }

    // GET endpoint (keeping for backward compatibility)
    @GetMapping("/username/{username}/password/{password}")
    public ResponseEntity<?> authenticateGet(@PathVariable String username, @PathVariable String password) {
        System.out.println("Authenticating user: " + username);
        for (Operator op : operatorService.getAllOperators()) {
            if (op.getUsername().equals(username) && op.getPassword().equals(password)) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("role", op.getRole().toString());
                response.put("username", op.getUsername());
                response.put("firstName", op.getFirstName());
                return ResponseEntity.ok(response);
            }
        }
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", "Invalid credentials");
        return ResponseEntity.badRequest().body(response);
    }

    // Simple DTO for authenticate request
    public static class AuthRequest {
        private String username;
        private String password;

        public AuthRequest() {}

        public AuthRequest(String username, String password) {
            this.username = username;
            this.password = password;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    @GetMapping("/all")
    public List<Operator> getAllOperators() {
        return operatorService.getAllOperators();
    }
}

    // 
    //     System.out.println("Authenticating user: " + username + " with password: " + password);
    //     for (Operator op : operatorService.getAllOperators()) {
    //                 System.out.println("Authenticating user: " + op.getUsername() + " with password: " + op.getPassword());
                    
    //         if (op.getUsername().equals(username) &&
    //             op.getPassword().equals(password)) {
    //                         System.out.println("Password matched");

    //             return ResponseEntity.accepted().build(); // success
    //         }
    //     }
    //     return ResponseEntity.badRequest().build(); // invalid login
 



  