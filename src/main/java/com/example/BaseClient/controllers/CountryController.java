package com.example.BaseClient.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.BaseClient.services.CountryService;

import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
@RequestMapping("/country")
public class CountryController {
    private CountryService countryService;

    @GetMapping
    public String getAll(Model model) {
        model.addAttribute("countries", countryService.getAllCustom());
        model.addAttribute("isActive", "country");
        return "country/index";
    }
}
