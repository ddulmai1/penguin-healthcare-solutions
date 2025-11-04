package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model;

import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Time;

@Entity
public class MedicalRecord {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
    @ManyToOne
    @JoinColumn(name = "operator_id")
    private Operator operator;
    @OneToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;
    String notes;
    Date date;
    Time time;

    public MedicalRecord(Patient patient, Operator operator, Appointment appointment, String notes, Date date,
                         Time time) {
        this.patient = patient;
        this.operator = operator;
        this.appointment = appointment;
        this.notes = notes;
        this.date = date;
        this.time = time;
    }

    public MedicalRecord(Long id, Patient patient, Operator operator, Appointment appointment, String notes, Date date,
                         Time time) {
        this.id = id;
        this.patient = patient;
        this.operator = operator;
        this.appointment = appointment;
        this.notes = notes;
        this.date = date;
        this.time = time;
    }

    public MedicalRecord() {
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

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
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
}
