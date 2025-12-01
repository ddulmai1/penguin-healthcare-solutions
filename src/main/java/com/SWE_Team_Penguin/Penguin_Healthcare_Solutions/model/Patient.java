package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
public class Patient {

    public enum Sex {
        MALE,
        FEMALE,
        OTHER
    }

    public enum PreferredContact{
        EMAIL,
        SMS
    }

    @Id
    @GeneratedValue
    private long id;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @Enumerated(EnumType.STRING)
    private Sex sex;
    private String healthConcerns;
    private String notes;
    @Enumerated(EnumType.STRING)
    private PreferredContact preferredContact;
    private String contactAddress;

    public Patient(String username, String password, String firstName, String lastName, Date dateOfBirth,
                   Gender gender, Sex sex, String healthConcerns, String notes, PreferredContact preferredContact,
                   String contactAddress) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.sex = sex;
        this.healthConcerns = healthConcerns;
        this.notes = notes;
        this.preferredContact = preferredContact;
        this.contactAddress = contactAddress;
    }

    public Patient() {
    }

    public Patient(long id, String username, String password, String firstName, String lastName, Date dateOfBirth,
                   Gender gender, Sex sex, String healthConcerns, String notes, PreferredContact preferredContact,
                   String contactAddress) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.sex = sex;
        this.healthConcerns = healthConcerns;
        this.notes = notes;
        this.preferredContact = preferredContact;
        this.contactAddress = contactAddress;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Sex getSex() {
        return sex;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public String getHealthConcerns() {
        return healthConcerns;
    }

    public void setHealthConcerns(String healthConcerns) {
        this.healthConcerns = healthConcerns;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public PreferredContact getPreferredContact() {
        return preferredContact;
    }

    public void setPreferredContact(PreferredContact preferredContact) {
        this.preferredContact = preferredContact;
    }

    public String getContactAddress() {
        return contactAddress;
    }

    public void setContactAddress(String contactAddress) {
        this.contactAddress = contactAddress;
    }
}
