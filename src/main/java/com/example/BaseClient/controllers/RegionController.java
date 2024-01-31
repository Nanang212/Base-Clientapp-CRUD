package com.example.BaseClient.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.BaseClient.services.RegionService;

import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
@RequestMapping("/region")
public class RegionController {
    private RegionService regionService;

    @GetMapping
    public String getAll(Model model) {
        model.addAttribute("regions", regionService.getAll());
        model.addAttribute("isActive", "region");
        return "region/index";
    }
}
