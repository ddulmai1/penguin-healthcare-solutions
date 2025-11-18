package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.controller;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Operator;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Patient;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services.OperatorService;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private OperatorService operatorService;

    @Autowired
    private PatientService patientService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Validate input
        if (request.getUsername() == null || request.getUsername().isEmpty() ||
            request.getPassword() == null || request.getPassword().isEmpty() ||
            request.getUserType() == null || request.getUserType().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("success", "false");
            error.put("message", "Missing username, password, or userType");
            return ResponseEntity.badRequest().body(error);
        }

        String userType = request.getUserType().toLowerCase();

        if ("operator".equals(userType)) {
            // Authenticate as operator
            Optional<Operator> opOpt = operatorService.findByUsername(request.getUsername());
            
            if (opOpt.isPresent() && opOpt.get().getPassword().equals(request.getPassword())) {
                // Success
                Operator op = opOpt.get();
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("role", op.getRole() != null ? op.getRole().toString() : "OPERATOR");
                response.put("userType", "operator");
                
                Map<String, Object> user = new HashMap<>();
                user.put("id", op.getId());
                user.put("username", op.getUsername());
                //user.put("name", op.getName());
                response.put("user", user);
                
                return ResponseEntity.ok(response);
            }
        } else if ("patient".equals(userType)) {
            // Authenticate as patient
            Optional<Patient> patOpt = patientService.findByUsername(request.getUsername());
            
            if (patOpt.isPresent() && patOpt.get().getPassword().equals(request.getPassword())) {
                // Success
                Patient pat = patOpt.get();
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("role", "Patient");
                response.put("userType", "patient");
                
                Map<String, Object> user = new HashMap<>();
                user.put("id", pat.getId());
                user.put("username", pat.getUsername());
                user.put("firstName", pat.getFirstName());
                user.put("lastName", pat.getLastName());
                response.put("user", user);
                
                return ResponseEntity.ok(response);
            }
        }

        // Invalid credentials or invalid userType
        Map<String, String> error = new HashMap<>();
        error.put("success", "false");
        error.put("message", "Invalid credentials");
        return ResponseEntity.status(401).body(error);
    }

    // LoginRequest DTO
    public static class LoginRequest {
        private String username;
        private String password;
        private String userType;

        public LoginRequest() {}

        public LoginRequest(String username, String password, String userType) {
            this.username = username;
            this.password = password;
            this.userType = userType;
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

        public String getUserType() {
            return userType;
        }

        public void setUserType(String userType) {
            this.userType = userType;
        }
    }
}
