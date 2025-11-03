package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.MedicalRecord;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Medication;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.repositories.MedicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicationService {
    @Autowired
    private MedicationRepository medicationRepository;

    public Medication getMedication(long id){
        return medicationRepository.findById(id).get();
    }

    public Medication createMedication(Medication medication){
        return medicationRepository.save(medication);
    }

    public void removeMedication(long id){
        medicationRepository.deleteById(id);
    }

    public List<Medication> getAllMedications(){
        return medicationRepository.findAll();
    }
}
