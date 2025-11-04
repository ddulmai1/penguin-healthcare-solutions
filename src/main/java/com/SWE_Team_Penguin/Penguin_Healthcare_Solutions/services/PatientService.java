package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Patient;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.repositories.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    public Patient getPatient(long id){
        return patientRepository.findById(id).get();
    }

    public Patient createPatient(Patient patient){
        return patientRepository.save(patient);
    }

    public void removePatient(long id){
        patientRepository.deleteById(id);
    }

    public List<Patient> getAllPatients(){
        return patientRepository.findAll();
    }
}
