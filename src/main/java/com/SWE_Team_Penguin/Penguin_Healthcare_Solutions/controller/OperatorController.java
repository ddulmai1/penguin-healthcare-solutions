package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.controller;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Operator;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services.OperatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/operators")
@CrossOrigin(origins = "http://localhost:3000")
public class OperatorController {

    @Autowired
    private OperatorService operatorService;

    // Authenticate user by username and password
    @GetMapping("/username/{username}/password/{password}")

    // @PostMapping("/authenticate")
    public ResponseEntity authenticate(@PathVariable String username, @PathVariable String password) {
        System.out.println("Authenticating user: " + username + " with password: " + password);
        for (Operator op : operatorService.getAllOperators()) {
                    System.out.println("Authenticating user: " + op.getUsername() + " with password: " + op.getPassword());
                    
            if (op.getUsername().equals(username) &&
                op.getPassword().equals(password)) {
                            System.out.println("Password matched");

                return ResponseEntity.accepted().build(); // success
            }
        }
        return ResponseEntity.badRequest().build(); // invalid login
    }
}
