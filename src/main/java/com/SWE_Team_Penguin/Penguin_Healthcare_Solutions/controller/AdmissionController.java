package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.controller;


import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Admission;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services.AdmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admission")
@CrossOrigin(origins = "http://localhost:3000")
public class AdmissionController {
    @Autowired
    private AdmissionService admissionService;



    @PostMapping("/createAdmission")
    public Admission createAdmission(@RequestBody Admission admission) {
        return admissionService.createAdmission(admission.getPatient(), admission.getOperator(),
                admission.getStatus(), admission.getNotes());
    }

    @PostMapping("/updateAdmission")
    public Admission updateAdmission(Admission admission) {
        return admissionService.updateAdmission(admission);
    }

    @GetMapping("/getAdmission/user/{id}")
    public Admission getAdmission(@PathVariable long id) {
        return admissionService.getAdmissionById(id);
    }
}
