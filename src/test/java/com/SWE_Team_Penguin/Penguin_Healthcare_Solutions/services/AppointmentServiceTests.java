package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Appointment;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Gender;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Operator;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Patient;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.annotation.DirtiesContext;

import java.sql.Date;
import java.sql.Time;
import java.util.NoSuchElementException;

import static org.junit.Assert.assertThrows;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class AppointmentServiceTests {
    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    PatientService patientService;
    @Autowired
    OperatorService operatorService;


    @Test
    public void removeAppointmentTest(){
        Patient patient = patientService.createPatient( new Patient("patient", "password",
                "Patient", "Name", Date.valueOf("1970-1-1"), Gender.MAN,
                Patient.Sex.FEMALE, "None", "None"));
        Operator operator = operatorService.createOperator( new Operator("operator", "password",
                Operator.Role.NURSE, "Operator", "Name", Date.valueOf("1912-12-12"), Gender.MAN,
                "None"));
        Appointment appointment = appointmentService.setAppointment(new Appointment(patient, operator,
                Date.valueOf("2020-12-12"), Time.valueOf("12:00:00"), Appointment.AppointmentType.CONCERN,
                "Sprained Ankle"));
        appointmentService.removeAppointment(appointment.getId());
        assertThrows(NoSuchElementException.class, () -> {appointmentService.getAppointment(appointment.getId());});
    }

    @Test
    public void getAllAppointmentsTest(){
        Patient patient = patientService.createPatient( new Patient("patient", "password",
                "Patient", "Name", Date.valueOf("1970-1-1"), Gender.MAN,
                Patient.Sex.FEMALE, "None", "None"));
        Operator operator = operatorService.createOperator( new Operator("operator", "password",
                Operator.Role.NURSE, "Operator", "Name", Date.valueOf("1912-12-12"), Gender.MAN,
                "None"));
        appointmentService.setAppointment(new Appointment(patient, operator,
                Date.valueOf("2020-12-12"), Time.valueOf("12:00:00"), Appointment.AppointmentType.CONCERN,
                "Sprained Ankle"));
        appointmentService.setAppointment(new Appointment(patient, operator,
                Date.valueOf("2020-12-24"), Time.valueOf("12:00:00"), Appointment.AppointmentType.FOLLOWUP,
                "Sprained Ankle"));
        assert(appointmentService.getAllAppointments().size() == 2);
    }

    @Test
    public void addAppointmentTest(){
        Patient patient = patientService.createPatient( new Patient("patient", "password",
                "Patient", "Name", Date.valueOf("1970-1-1"), Gender.MAN,
                Patient.Sex.FEMALE, "None", "None"));
        Operator operator = operatorService.createOperator( new Operator("operator", "password",
                Operator.Role.NURSE, "Operator", "Name", Date.valueOf("1912-12-12"), Gender.MAN,
                "None"));
        Appointment appointment = appointmentService.setAppointment(new Appointment(patient, operator,
                Date.valueOf("2020-12-12"), Time.valueOf("12:00:00"), Appointment.AppointmentType.CONCERN,
                "Sprained Ankle"));
        Appointment newAppointment = appointmentService.getAppointment(appointment.getId());
        assert newAppointment.getId() == appointment.getId();
    }
}
