package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.LabReport;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.MedicalRecord;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.repositories.MedicalRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalRecordService {
    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    public MedicalRecord getAppointment(long id){
        return medicalRecordRepository.findById(id).get();
    }

    public MedicalRecord createMedicalRecord(MedicalRecord medicalRecord){
        return medicalRecordRepository.save(medicalRecord);
    }

    public void removeMedicalRecord(long id){
        medicalRecordRepository.deleteById(id);
    }

    public List<MedicalRecord> getAllMedicalRecords(){
        return medicalRecordRepository.findAll();
    }
}
