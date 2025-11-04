package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Gender;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Operator;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.repositories.OperatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;

import java.sql.Date;
import java.util.List;

@Service
public class OperatorService {
    @Autowired
    private OperatorRepository operatorRepository;

    public Operator getOperator(long id){
        return operatorRepository.findById(id).get();
    }

    public Operator createOperator(Operator operator){
        return operatorRepository.save(operator);
    }

    public void removeOperator(long id){
        operatorRepository.deleteById(id);
    }

    public List<Operator> getAllOperators(){
        return operatorRepository.findAll();
    }
    @PostConstruct
    public void login() {
        createOperator(new Operator("Admin", "12345", Operator.Role.NURSE, "John", "Doe", Date.valueOf("1912-12-12"), Gender.MAN, "None"));
    }
    }

