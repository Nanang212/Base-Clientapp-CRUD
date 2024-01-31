package com.example.BaseClient.utils;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import nz.net.ultraq.thymeleaf.layoutdialect.LayoutDialect;

@Configuration
public class LayoutDialectUtil {

    @Bean
    public LayoutDialect layoutDialect(){
        return new LayoutDialect();
    }
}
