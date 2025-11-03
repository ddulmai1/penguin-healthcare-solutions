package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Prescription;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.repositories.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrescriptionService {
    @Autowired
    private PrescriptionRepository prescriptionRepository;

    public Prescription getPrescription(long id){
        return prescriptionRepository.findById(id).get();
    }

    public Prescription createPrescription(Prescription prescription){
        return prescriptionRepository.save(prescription);
    }

    public void removePrescription(long id){
        prescriptionRepository.deleteById(id);
    }

    public List<Prescription> getAllPrescriptions(){
        return prescriptionRepository.findAll();
    }
}
