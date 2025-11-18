package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.repositories;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Operator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OperatorRepository extends JpaRepository<Operator, Long> {
    java.util.Optional<Operator> findByUsername(String username);
}
