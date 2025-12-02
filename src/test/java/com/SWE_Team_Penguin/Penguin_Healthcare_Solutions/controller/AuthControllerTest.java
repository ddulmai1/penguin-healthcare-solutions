package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.controller;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Gender;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Operator;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Patient;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services.OperatorService;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services.PatientService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.sql.Date;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class AuthControllerTest {
    @Autowired
    private OperatorService operatorService;
    @Autowired
    private PatientService patientService;
    @Autowired
    private MockMvc mockMvc;
    private final ObjectMapper mapper = new ObjectMapper();

    @Test
    void loginOperator() throws Exception {
        operatorService.createOperator(new Operator("ao","pw", Operator.Role.DOCTOR, "A","B", Date.valueOf("1980-01-01"), Gender.MAN, "n"));
        String body = mapper.writeValueAsString(new LoginReq("ao","pw","operator"));
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login").contentType(MediaType.APPLICATION_JSON).content(body)).andExpect(status().isOk()).andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void loginPatient() throws Exception {
        patientService.createPatient(new Patient("pa","pw","F","L", Date.valueOf("1999-01-01"), Gender.WOMAN, Patient.Sex.FEMALE, "n","n"));
        String body = mapper.writeValueAsString(new LoginReq("pa","pw","patient"));
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login").contentType(MediaType.APPLICATION_JSON).content(body)).andExpect(status().isOk()).andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void loginInvalid() throws Exception {
        String body = mapper.writeValueAsString(new LoginReq("x","y","operator"));
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login").contentType(MediaType.APPLICATION_JSON).content(body)).andExpect(status().isUnauthorized());
    }

    static class LoginReq {
        public String username;
        public String password;
        public String userType;
        public LoginReq(String u,String p,String t){this.username=u;this.password=p;this.userType=t;}
    }
}

