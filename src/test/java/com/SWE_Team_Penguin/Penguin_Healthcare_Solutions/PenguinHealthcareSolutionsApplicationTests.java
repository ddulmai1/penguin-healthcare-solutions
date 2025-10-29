package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
class PenguinHealthcareSolutionsApplicationTests {

	@Test
	void contextLoads() {
	}

}
