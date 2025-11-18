package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

@Entity
public class Admission {
    public enum Status{
        ADMITTED,
        DISCHARGED,
        TRANSFERRED
    }

    public enum EncounterType{
        INPATIENT,
        OUTPATIENT,
        EMERGENCY
    }

    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
    @ManyToOne
    @JoinColumn(name = "operator_id")
    private Operator operator;
    @Enumerated(EnumType.STRING)
    private Admission.Status status;
    private Timestamp dateTime;
    private String notes;
    private String department;
    private String roomNumber;
    @Enumerated(EnumType.STRING)
    private EncounterType  encounterType;

    public Admission() {
    }

    public Admission(long id, Patient patient, Operator operator, Status status, Timestamp dateTime, String notes,
                     String department, String roomNumber, EncounterType encounterType) {
        this.id = id;
        this.patient = patient;
        this.operator = operator;
        this.status = status;
        this.dateTime = dateTime;
        this.notes = notes;
        this.department = department;
        this.roomNumber = roomNumber;
        this.encounterType = encounterType;
    }

    public Admission(Patient patient, Operator operator, Status status, Timestamp dateTime, String notes,
                     String department, String roomNumber, EncounterType encounterType) {
        this.patient = patient;
        this.operator = operator;
        this.status = status;
        this.dateTime = dateTime;
        this.notes = notes;
        this.department = department;
        this.roomNumber = roomNumber;
        this.encounterType = encounterType;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public EncounterType getEncounterType() {
        return encounterType;
    }

    public void setEncounterType(EncounterType encounterType) {
        this.encounterType = encounterType;
    }

    public Timestamp getDateTime() {
        return dateTime;
    }

    public void setDateTime(Timestamp dateTime) {
        this.dateTime = dateTime;
    }
}
