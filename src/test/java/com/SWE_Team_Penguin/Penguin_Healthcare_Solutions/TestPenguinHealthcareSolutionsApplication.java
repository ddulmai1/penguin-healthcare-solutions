package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions;

import org.springframework.boot.SpringApplication;

public class TestPenguinHealthcareSolutionsApplication {

	public static void main(String[] args) {
		SpringApplication.from(PenguinHealthcareSolutionsApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
