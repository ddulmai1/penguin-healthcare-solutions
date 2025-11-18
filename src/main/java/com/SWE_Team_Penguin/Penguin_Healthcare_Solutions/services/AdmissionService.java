package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Admission;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Appointment;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Operator;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Patient;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.repositories.AdmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

@Service
public class AdmissionService {
    @Autowired
    private AdmissionRepository admissionRepository;

    public Admission getAdmissionById(Long id) {
        return admissionRepository.findById(id).get();
    }

    public List<Admission> getAdmissionByPatient(Patient patient) {
        return admissionRepository.findAll().stream().
                filter(admission -> admission.getPatient().equals(patient)).toList();
    }

    public List<Admission> getAllAdmissions() {
        return admissionRepository.findAll();
    }

    public Admission createAdmission(Patient patient, Operator operator, Admission.Status status, String notes,
                                     String department, String roomNumber, Admission.EncounterType encounterType) {
        return admissionRepository.save(new Admission(patient, operator, status, new Timestamp(System.currentTimeMillis()),
                notes, department, roomNumber, encounterType));
    }

    public Admission updateAdmission(Admission admission) {
        return admissionRepository.save(admission);
    }
}
