package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model;

import jakarta.persistence.*;


@Entity
public class Medication {
    public enum MedicationType{
        ANTIDEPRESSANT,
        ANTIBIOTIC
    }

    public enum DoseType{
        PILL,
        GEL,
        POWDER,
        INJECTION
    }

    @Id
    @GeneratedValue
    private long id;
    private String name;
    private String brandName;
    @Enumerated(EnumType.STRING)
    private MedicationType  medicationType;
    @Enumerated(EnumType.STRING)
    private DoseType doseType;
    private long safeDose;
    private String sideEffects;

    public Medication(String name, String brandName, MedicationType medicationType, DoseType doseType, long safeDose,
                      String sideEffects) {
        this.name = name;
        this.brandName = brandName;
        this.medicationType = medicationType;
        this.doseType = doseType;
        this.safeDose = safeDose;
        this.sideEffects = sideEffects;
    }

    public Medication(long id, String name, String brandName, MedicationType medicationType, DoseType doseType,
                      long safeDose, String sideEffects) {
        this.id = id;
        this.name = name;
        this.brandName = brandName;
        this.medicationType = medicationType;
        this.doseType = doseType;
        this.safeDose = safeDose;
        this.sideEffects = sideEffects;
    }

    public Medication() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public MedicationType getMedicationType() {
        return medicationType;
    }

    public void setMedicationType(MedicationType medicationType) {
        this.medicationType = medicationType;
    }

    public DoseType getDoseType() {
        return doseType;
    }

    public void setDoseType(DoseType doseType) {
        this.doseType = doseType;
    }

    public long getSafeDose() {
        return safeDose;
    }

    public void setSafeDose(long safeDose) {
        this.safeDose = safeDose;
    }

    public String getSideEffects() {
        return sideEffects;
    }

    public void setSideEffects(String sideEffects) {
        this.sideEffects = sideEffects;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

}
