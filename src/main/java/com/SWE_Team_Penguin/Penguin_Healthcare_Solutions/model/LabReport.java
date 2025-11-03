package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model;

import jakarta.persistence.*;

@Entity
public class LabReport {
    public enum LabType{
        BLOODWORK,
        XRAY,
        MRI,
    }
    
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
    @ManyToOne
    @JoinColumn(name = "operator_id")
    private Operator operator;
    @ManyToOne
    @JoinColumn(name = "medical_record_id")
    private MedicalRecord medicalRecord;
    @Enumerated(EnumType.STRING)
    private LabType labType;
    private String notes;

    public LabReport(Patient patient, Operator operator, MedicalRecord medicalRecord, LabType labType,
                     String notes) {
        this.id = id;
        this.patient = patient;
        this.operator = operator;
        this.medicalRecord = medicalRecord;
        this.labType = labType;
        this.notes = notes;
    }

    public LabReport(Long id, Patient patient, Operator operator, MedicalRecord medicalRecord, LabType labType, String notes) {
        this.id = id;
        this.patient = patient;
        this.operator = operator;
        this.medicalRecord = medicalRecord;
        this.labType = labType;
        this.notes = notes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Operator getOperator() {
        return operator;
    }

    public void setOperator(Operator operator) {
        this.operator = operator;
    }

    public MedicalRecord getMedicalRecord() {
        return medicalRecord;
    }

    public void setMedicalRecord(MedicalRecord medicalRecord) {
        this.medicalRecord = medicalRecord;
    }

    public LabType getLabType() {
        return labType;
    }

    public void setLabType(LabType labType) {
        this.labType = labType;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LabReport() {
    }
}
