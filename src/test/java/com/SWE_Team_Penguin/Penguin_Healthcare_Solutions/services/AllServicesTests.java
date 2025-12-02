package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.*;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.repositories.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class AllServicesTests {
    @Autowired
    private PatientService patientService;
    @Autowired
    private OperatorService operatorService;
    @Autowired
    private AdmissionService admissionService;
    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private MedicationService medicationService;
    @Autowired
    private MedicalRecordService medicalRecordService;
    @Autowired
    private PrescriptionService prescriptionService;

    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private OperatorRepository operatorRepository;
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private MedicationRepository medicationRepository;
    @Autowired
    private MedicalRecordRepository medicalRecordRepository;
    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Test
    void patientServiceCrud() {
        Patient p = new Patient("u1", "pw", "John", "Doe", Date.valueOf("2000-01-01"), Gender.MAN, Patient.Sex.MALE, "None", "N");
        Patient saved = patientService.createPatient(p);
        assertNotNull(saved.getId());
        assertTrue(patientService.getPatient(saved.getId()).isPresent());
        assertFalse(patientService.getAllPatients().isEmpty());
        patientService.removePatient(saved.getId());
        assertTrue(patientService.getPatient(saved.getId()).isEmpty());
    }

    @Test
    void operatorServiceCrudAndFind() {
        Operator op = new Operator("op1", "pw", Operator.Role.DOCTOR, "Alice", "Doe", Date.valueOf("1990-02-02"), Gender.WOMAN, "N");
        Operator saved = operatorService.createOperator(op);
        assertNotNull(saved.getId());
        assertTrue(operatorService.findByUsername("op1").isPresent());
        assertFalse(operatorService.getAllOperators().isEmpty());
        operatorService.removeOperator(saved.getId());
        assertTrue(operatorService.findByUsername("op1").isEmpty());
    }

    @Test
    void admissionServiceCreateAndQuery() {
        Patient p = patientService.createPatient(new Patient("u2", "pw", "Pat", "Smith", Date.valueOf("1995-03-03"), Gender.MAN, Patient.Sex.MALE, "None", "N"));
        Operator op = operatorService.createOperator(new Operator("op2", "pw", Operator.Role.NURSE, "Bob", "Jones", Date.valueOf("1988-04-04"), Gender.MAN, "N"));
        Admission a = admissionService.createAdmission(p, op, Admission.Status.ADMITTED, "", "ER", "101", Admission.EncounterType.EMERGENCY);
        assertNotNull(a.getId());
        Admission got = admissionService.getAdmissionById(a.getId());
        assertEquals(a.getId(), got.getId());
        List<Admission> list = admissionService.getAdmissionByPatient(p);
        assertFalse(list.isEmpty());
        assertFalse(admissionService.getAllAdmissions().isEmpty());
    }

    @Test
    void appointmentServiceCrud() {
        Patient p = patientService.createPatient(new Patient("u3", "pw", "Tom", "Lee", Date.valueOf("1999-05-05"), Gender.MAN, Patient.Sex.MALE, "None", "N"));
        Operator op = operatorService.createOperator(new Operator("op3", "pw", Operator.Role.DOCTOR, "Eve", "Ray", Date.valueOf("1985-06-06"), Gender.WOMAN, "N"));
        Appointment ap = new Appointment();
        ap.setPatient(p);
        ap.setOperator(op);
        ap.setDate(Date.valueOf("2025-01-01"));
        ap.setTime(Time.valueOf("10:00:00"));
        ap.setType(Appointment.AppointmentType.CONSULTATION);
        ap.setNotes("n");
        Appointment saved = appointmentService.setAppointment(ap);
        assertNotNull(saved.getId());
        Appointment got = appointmentService.getAppointment(saved.getId());
        assertEquals(saved.getId(), got.getId());
        assertFalse(appointmentService.getAllAppointments().isEmpty());
        appointmentService.removeAppointment(saved.getId());
        assertTrue(appointmentRepository.findById(saved.getId()).isEmpty());
    }

    @Test
    void medicationServiceCrud() {
        Medication m = new Medication();
        m.setName("Med");
        m.setBrandName("Brand");
        m.setMedicationType(Medication.MedicationType.ANTIBIOTIC);
        m.setDoseType(Medication.DoseType.PILL);
        m.setSafeDose(1);
        m.setSideEffects("none");
        Medication saved = medicationService.createMedication(m);
        assertNotNull(saved.getId());
        Medication got = medicationService.getMedication(saved.getId());
        assertEquals(saved.getId(), got.getId());
        assertFalse(medicationService.getAllMedications().isEmpty());
        medicationService.removeMedication(saved.getId());
        assertTrue(medicationRepository.findById(saved.getId()).isEmpty());
    }

    @Test
    void medicalRecordServiceCrud() {
        Patient p = patientService.createPatient(new Patient("u4", "pw", "Ann", "Kim", Date.valueOf("1991-07-07"), Gender.WOMAN, Patient.Sex.FEMALE, "None", "N"));
        Operator op = operatorService.createOperator(new Operator("op4", "pw", Operator.Role.DOCTOR, "Jim", "Hal", Date.valueOf("1982-08-08"), Gender.MAN, "N"));
        Appointment ap = new Appointment();
        ap.setPatient(p);
        ap.setOperator(op);
        ap.setDate(Date.valueOf("2025-02-02"));
        ap.setTime(Time.valueOf("11:00:00"));
        ap.setType(Appointment.AppointmentType.LAB);
        ap.setNotes("n");
        Appointment apSaved = appointmentService.setAppointment(ap);
        MedicalRecord mr = new MedicalRecord();
        mr.setPatient(p);
        mr.setOperator(op);
        mr.setAppointment(apSaved);
        mr.setNotes("notes");
        mr.setDate(Date.valueOf("2025-02-02"));
        mr.setTime(Time.valueOf("11:00:00"));
        MedicalRecord saved = medicalRecordService.createMedicalRecord(mr);
        assertNotNull(saved.getId());
        MedicalRecord got = medicalRecordService.getAppointment(saved.getId());
        assertEquals(saved.getId(), got.getId());
        assertFalse(medicalRecordService.getAllMedicalRecords().isEmpty());
        medicalRecordService.removeMedicalRecord(saved.getId());
        assertTrue(medicalRecordRepository.findById(saved.getId()).isEmpty());
    }

    @Test
    void prescriptionServiceCrud() {
        Patient p = patientService.createPatient(new Patient("u5", "pw", "Zed", "Max", Date.valueOf("1993-09-09"), Gender.MAN, Patient.Sex.MALE, "None", "N"));
        Operator op = operatorService.createOperator(new Operator("op5", "pw", Operator.Role.NURSE, "Neo", "Fox", Date.valueOf("1980-10-10"), Gender.MAN, "N"));
        Medication m = new Medication();
        m.setName("Med");
        m.setBrandName("Brand");
        m.setMedicationType(Medication.MedicationType.ANTIDEPRESSANT);
        m.setDoseType(Medication.DoseType.PILL);
        m.setSafeDose(2);
        m.setSideEffects("none");
        Medication mSaved = medicationService.createMedication(m);
        Appointment ap = new Appointment();
        ap.setPatient(p);
        ap.setOperator(op);
        ap.setDate(Date.valueOf("2025-03-03"));
        ap.setTime(Time.valueOf("12:00:00"));
        ap.setType(Appointment.AppointmentType.FOLLOWUP);
        ap.setNotes("n");
        Appointment apSaved = appointmentService.setAppointment(ap);
        MedicalRecord mr = new MedicalRecord();
        mr.setPatient(p);
        mr.setOperator(op);
        mr.setAppointment(apSaved);
        mr.setNotes("notes");
        mr.setDate(Date.valueOf("2025-03-03"));
        mr.setTime(Time.valueOf("12:00:00"));
        MedicalRecord mrSaved = medicalRecordService.createMedicalRecord(mr);
        Prescription pr = new Prescription();
        pr.setPatient(p);
        pr.setOperator(op);
        pr.setMedicalRecord(mrSaved);
        pr.setMedication(mSaved);
        pr.setDose(1);
        pr.setPrescribedDate(Date.valueOf("2025-03-03"));
        pr.setRenew(false);
        pr.setRenewalTime(Time.valueOf("12:00:00"));
        Prescription saved = prescriptionService.createPrescription(pr);
        assertNotNull(saved.getId());
        Prescription got = prescriptionService.getPrescription(saved.getId());
        assertEquals(saved.getId(), got.getId());
        assertFalse(prescriptionService.getAllPrescriptions().isEmpty());
        prescriptionService.removePrescription(saved.getId());
        assertTrue(prescriptionRepository.findById(saved.getId()).isEmpty());
    }
}

