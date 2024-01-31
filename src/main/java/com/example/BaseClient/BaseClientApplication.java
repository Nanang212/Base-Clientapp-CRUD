package com.example.BaseClient;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BaseClientApplication {

	public static void main(String[] args) {
		SpringApplication.run(BaseClientApplication.class, args);
		System.out.println("RUNNING WITH ME");
	}

}
