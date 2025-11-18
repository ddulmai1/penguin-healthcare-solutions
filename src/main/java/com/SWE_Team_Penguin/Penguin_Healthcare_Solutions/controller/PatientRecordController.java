package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.controller;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Patient;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:3000") // Allow your React frontend to access
public class PatientRecordController {

    @Autowired
    private PatientService patientService;

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable long id) {
        Optional<Patient> patient = patientService.getPatient(id);
        return patient.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
@PostMapping
    public Patient createPatient(@RequestBody Patient patient) {
        return patientService.createPatient(patient);
    }

    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable long id) {
        patientService.removePatient(id);
    }

    @PostMapping("/verify-access")
    public VerifyAccessResponse verifyAccess(@RequestBody VerifyAccessRequest request) {
        // For now, grant access to all clinicians and admins
        boolean accessGranted = "Clinician".equalsIgnoreCase(request.getUserRole()) || 
                                "Admin".equalsIgnoreCase(request.getUserRole());
        return new VerifyAccessResponse(accessGranted, accessGranted ? "Access granted" : "Access denied");
    }

    // Inner classes for request/response
    public static class VerifyAccessRequest {
        private String userRole;
        private String patientId;

        public VerifyAccessRequest() {}

        public VerifyAccessRequest(String userRole, String patientId) {
            this.userRole = userRole;
            this.patientId = patientId;
        }

        public String getUserRole() {
            return userRole;
        }

        public void setUserRole(String userRole) {
            this.userRole = userRole;
        }

        public String getPatientId() {
            return patientId;
        }

        public void setPatientId(String patientId) {
            this.patientId = patientId;
        }
    }

    public static class VerifyAccessResponse {
        private boolean accessGranted;
        private String message;

        public VerifyAccessResponse() {}

        public VerifyAccessResponse(boolean accessGranted, String message) {
            this.accessGranted = accessGranted;
            this.message = message;
        }

        public boolean isAccessGranted() {
            return accessGranted;
        }

        public void setAccessGranted(boolean accessGranted) {
            this.accessGranted = accessGranted;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}