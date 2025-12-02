package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Gender;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Patient;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Patient.Sex;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Patient.PreferredContact;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.repositories.PatientRepository;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    public Optional<Patient> getPatient(long id){
        return patientRepository.findById(id);
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

    //new method for finding by username - for patient login
    public Optional<Patient> findByUsername(String username) {
        return patientRepository.findByUsername(username);
    }

    // @PostConstruct
    // public void login() {
    //     createPatient(new Patient("patient_john", "password123", "John", "Patient", Date.valueOf("2003-3-10"), Gender.MAN,
    //             Sex.MALE, "None", "No notes", Patient.PreferredContact.SMS, "test@email.com"));

    // }
}
  
