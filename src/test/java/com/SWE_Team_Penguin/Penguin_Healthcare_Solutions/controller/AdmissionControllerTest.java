package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.controller;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.*;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.bind.annotation.PostMapping;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


import java.sql.Date;
import java.sql.Time;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class AdmissionControllerTest {
    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private PatientService patientService;
    @Autowired
    private OperatorService operatorService;
    @Autowired
    private AdmissionController admissionController;
    @Autowired
    private AdmissionService admissionService;
    @Autowired
    private MockMvc mockMvc;
    private ObjectMapper mapper = new ObjectMapper();

    @Test
    void createAdmission() throws Exception {
        Patient patient = patientService.createPatient( new Patient("patient", "password",
                "Patient", "Name", Date.valueOf("1970-1-1"), Gender.MAN,
                Patient.Sex.FEMALE, "None", "None"));
        Operator operator = operatorService.createOperator( new Operator("operator", "password",
                Operator.Role.NURSE, "Operator", "Name", Date.valueOf("1912-12-12"), Gender.MAN,
                "None"));
        Admission admission = new Admission(patient, operator, Admission.Status.ADMITTED, new Date(0), new Time(0), "");
        mockMvc.perform(MockMvcRequestBuilders.post("/api/admission/createAdmission").
                contentType(MediaType.APPLICATION_JSON).
                content(mapper.writeValueAsString(admission))).andExpect(status().isOk());

    }

    @Test
    void updateAdmission() throws Exception {
        Patient patient = patientService.createPatient( new Patient("patient", "password",
                "Patient", "Name", Date.valueOf("1970-1-1"), Gender.MAN,
                Patient.Sex.FEMALE, "None", "None"));
        Operator operator = operatorService.createOperator( new Operator("operator", "password",
                Operator.Role.NURSE, "Operator", "Name", Date.valueOf("1912-12-12"), Gender.MAN,
                "None"));
        Admission admission = admissionService.createAdmission(patient, operator, Admission.Status.ADMITTED,  "");
        admission.setStatus(Admission.Status.DISCHARGED);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/admission/updateAdmission").
                contentType(MediaType.APPLICATION_JSON).
                content(mapper.writeValueAsString(admission))).andExpect(status().isOk());

    }

    @Test
    void getAdmission() throws Exception {
        Patient patient = patientService.createPatient( new Patient("patient", "password",
                "Patient", "Name", Date.valueOf("1970-1-1"), Gender.MAN,
                Patient.Sex.FEMALE, "None", "None"));
        Operator operator = operatorService.createOperator( new Operator("operator", "password",
                Operator.Role.NURSE, "Operator", "Name", Date.valueOf("1912-12-12"), Gender.MAN,
                "None"));
        Admission admission = admissionService.createAdmission(patient, operator, Admission.Status.ADMITTED, "");

        mockMvc.perform(MockMvcRequestBuilders.get("/api/admission//getAdmission/user/" + admission.getId())).andExpect(status().isOk());


    }
}
