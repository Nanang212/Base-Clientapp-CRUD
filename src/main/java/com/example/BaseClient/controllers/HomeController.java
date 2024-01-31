package com.example.BaseClient.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping
    public String home(Model model){
        model.addAttribute("isActive", "home");
        return "index";
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
      // model.addAttribute("name", "MCC 81");
      model.addAttribute("isActive", "home");
      return "index";
    }
}
