package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Time;

@Entity
public class Admission {
    public enum Status{
        ADMITTED,
        DISCHARGED,
        TRANSFERRED
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
    private Date date;
    private Time time;
    private String notes;

    public Admission() {
    }

    public Admission(long id, Patient patient, Operator operator, Status status, Date date,
                     Time time, String notes) {
        this.id = id;
        this.patient = patient;
        this.operator = operator;
        this.status = status;
        this.date = date;
        this.time = time;
        this.notes = notes;
    }

    public Admission(Patient patient, Operator operator, Status status, Date date, Time time,
                     String notes) {
        this.patient = patient;
        this.operator = operator;
        this.status = status;
        this.date = date;
        this.time = time;
        this.notes = notes;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
