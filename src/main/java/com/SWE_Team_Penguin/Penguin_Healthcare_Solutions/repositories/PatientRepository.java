package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.repositories;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByUsername(String username);
}
