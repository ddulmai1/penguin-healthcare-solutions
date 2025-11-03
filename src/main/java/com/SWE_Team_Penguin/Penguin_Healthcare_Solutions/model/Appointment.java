package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model;

import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Time;

@Entity
public class Appointment {
    public enum AppointmentType{
        PHYSICAL,
        CONSULTATION,
        LAB,
        FOLLOWUP,
        CONCERN
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
    private Date date;
    private Time time;
    @Enumerated(EnumType.STRING)
    private AppointmentType type;
    String notes;

    public Appointment(Patient patient, Operator operator, Date date, Time time, AppointmentType type, String notes) {
        this.patient = patient;
        this.operator = operator;
        this.date = date;
        this.time = time;
        this.type = type;
        this.notes = notes;
    }

    public Appointment(long id, Patient patient, Operator operator, Date date, Time time, AppointmentType type,
                       String notes) {
        this.id = id;
        this.patient = patient;
        this.operator = operator;
        this.date = date;
        this.time = time;
        this.type = type;
        this.notes = notes;
    }

    public Appointment() {
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

    public AppointmentType getType() {
        return type;
    }

    public void setType(AppointmentType type) {
        this.type = type;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
