package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.repositories;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
}
