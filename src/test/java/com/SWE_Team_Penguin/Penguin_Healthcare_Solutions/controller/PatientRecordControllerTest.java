package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.controller;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Gender;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Patient;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services.PatientService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.sql.Date;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class PatientRecordControllerTest {
    @Autowired
    private PatientService patientService;
    @Autowired
    private MockMvc mockMvc;

    @Test
    void getAndDeletePatient() throws Exception {
        Patient p = patientService.createPatient(new Patient("u10","pw","F","L", Date.valueOf("2001-01-01"), Gender.MAN, Patient.Sex.MALE, "n","n"));
        mockMvc.perform(MockMvcRequestBuilders.get("/api/patients/" + p.getId())).andExpect(status().isOk());
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/patients/" + p.getId())).andExpect(status().isOk());
        mockMvc.perform(MockMvcRequestBuilders.get("/api/patients/" + p.getId())).andExpect(status().isNotFound());
    }
}

