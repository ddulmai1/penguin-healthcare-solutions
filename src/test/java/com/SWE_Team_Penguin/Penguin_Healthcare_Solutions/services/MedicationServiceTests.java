package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Medication;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.annotation.DirtiesContext;

import java.util.NoSuchElementException;

import static org.junit.Assert.assertThrows;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class MedicationServiceTests {
    @Autowired
    private MedicationService medicationService;

    @Test
    public void removeMedicationTest(){
        Medication medication = medicationService.createMedication(new Medication("Ibuprofin", "",
                Medication.MedicationType.ANTIBIOTIC, Medication.DoseType.PILL, 300L, "None"));
        medicationService.removeMedication(medication.getId());
        assertThrows(NoSuchElementException.class, () -> {medicationService.getMedication(medication.getId());});
    }

    @Test
    public void getAllMedicationsTest(){
        medicationService.createMedication(new Medication("Ibuprofin", "",
            Medication.MedicationType.ANTIBIOTIC, Medication.DoseType.PILL, 300L, "None"));
        medicationService.createMedication(new Medication("Excitalopram", "Lexapro",
                Medication.MedicationType.ANTIBIOTIC, Medication.DoseType.PILL, 300L, "None"));
        assert(medicationService.getAllMedications().size() == 2);
    }

    @Test
    public void addMedicationTest(){
        assert(medicationService.getMedication(medicationService.createMedication(new Medication("Ibuprofin", "",
                Medication.MedicationType.ANTIBIOTIC, Medication.DoseType.PILL, 300L, "None")).getId()) != null);
    }
}
