package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model;

import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Time;

@Entity
public class Prescription {
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
    @ManyToOne
    @JoinColumn(name = "medication_id")
    private Medication medication;
    long dose;
    Date prescribedDate;
    boolean renew;
    Time renewalTime;

    public Prescription(Patient patient, Operator operator, MedicalRecord medicalRecord, Medication medication,
                        long dose, Date prescribedDate, boolean renew, Time renewalTime) {
        this.patient = patient;
        this.operator = operator;
        this.medicalRecord = medicalRecord;
        this.medication = medication;
        this.dose = dose;
        this.prescribedDate = prescribedDate;
        this.renew = renew;
        this.renewalTime = renewalTime;
    }

    public Prescription(Long id, Patient patient, Operator operator, MedicalRecord medicalRecord, Medication medication,
                        long dose, Date prescribedDate, boolean renew, Time renewalTime) {
        this.id = id;
        this.patient = patient;
        this.operator = operator;
        this.medicalRecord = medicalRecord;
        this.medication = medication;
        this.dose = dose;
        this.prescribedDate = prescribedDate;
        this.renew = renew;
        this.renewalTime = renewalTime;
    }

    public Prescription() {
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

    public Medication getMedication() {
        return medication;
    }

    public void setMedication(Medication medication) {
        this.medication = medication;
    }

    public long getDose() {
        return dose;
    }

    public void setDose(long dose) {
        this.dose = dose;
    }

    public Date getPrescribedDate() {
        return prescribedDate;
    }

    public void setPrescribedDate(Date prescribedDate) {
        this.prescribedDate = prescribedDate;
    }

    public boolean isRenew() {
        return renew;
    }

    public void setRenew(boolean renew) {
        this.renew = renew;
    }

    public Time getRenewalTime() {
        return renewalTime;
    }

    public void setRenewalTime(Time renewalTime) {
        this.renewalTime = renewalTime;
    }
}
