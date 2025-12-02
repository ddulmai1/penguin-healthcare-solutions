package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.controller;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Gender;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Operator;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services.OperatorService;
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
public class OperatorControllerTest {
    @Autowired
    private OperatorService operatorService;
    @Autowired
    private MockMvc mockMvc;
    private final ObjectMapper mapper = new ObjectMapper();

    @Test
    void authenticatePost() throws Exception {
        operatorService.createOperator(new Operator("user1","pw", Operator.Role.DOCTOR, "A","B", Date.valueOf("1990-01-01"), Gender.MAN, "n"));
        String body = mapper.writeValueAsString(new AuthBody("user1","pw"));
        mockMvc.perform(MockMvcRequestBuilders.post("/api/operators/authenticate").contentType(MediaType.APPLICATION_JSON).content(body)).andExpect(status().isOk()).andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void authenticateGet() throws Exception {
        operatorService.createOperator(new Operator("user2","pw", Operator.Role.NURSE, "A","B", Date.valueOf("1991-01-01"), Gender.WOMAN, "n"));
        mockMvc.perform(MockMvcRequestBuilders.get("/api/operators/username/user2/password/pw")).andExpect(status().isOk()).andExpect(jsonPath("$.success").value(true));
    }

    static class AuthBody {
        public String username;
        public String password;
        public AuthBody(String u, String p) { this.username = u; this.password = p; }
    }
}

