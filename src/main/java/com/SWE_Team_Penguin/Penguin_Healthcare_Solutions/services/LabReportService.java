package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.LabReport;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.repositories.LabReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LabReportService {
    @Autowired
    private LabReportRepository labReportRepository;

    public LabReport getAppointment(long id){
        return labReportRepository.findById(id).get();
    }

    public LabReport createLabReport(LabReport labReport){
        return labReportRepository.save(labReport);
    }

    public void removeLabReport(long id){
        labReportRepository.deleteById(id);
    }

    public List<LabReport> getAllLabReports(){
        return labReportRepository.findAll();
    }
}
