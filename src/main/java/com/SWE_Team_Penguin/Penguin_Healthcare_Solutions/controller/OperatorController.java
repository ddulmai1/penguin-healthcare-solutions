package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.controller;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Operator;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services.OperatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/operators")
@CrossOrigin(origins = "http://localhost:3000")
public class OperatorController {

    @Autowired
    private OperatorService operatorService;

    // Authenticate user by username and password
    @PostMapping("/authenticate")
    public Operator authenticate(@RequestBody Operator loginRequest) {
        for (Operator op : operatorService.getAllOperators()) {
            if (op.getUsername().equals(loginRequest.getUsername()) &&
                op.getPassword().equals(loginRequest.getPassword())) {
                return op; // success
            }
        }
        return null; // invalid login
    }
}
