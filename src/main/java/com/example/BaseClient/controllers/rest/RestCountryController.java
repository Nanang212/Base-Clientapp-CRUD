package com.example.BaseClient.controllers.rest;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.BaseClient.models.Country;
import com.example.BaseClient.models.dto.request.CountryRequest;
import com.example.BaseClient.models.dto.response.CountryResponse;
import com.example.BaseClient.services.CountryService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("api/country")
public class RestCountryController {
    private CountryService countryService;

    @GetMapping
    public List<CountryResponse> getAll(){
        return countryService.getAllCustom();
    }

    @GetMapping("/{id}")
    public Country getById(@PathVariable Integer id){
        return countryService.getById(id);
    }

    @PostMapping
    public Country create(@RequestBody CountryRequest countryRequest){
        return countryService.createCustom(countryRequest);
    }

    @PutMapping("/{id}")
    public Country update(@PathVariable Integer id, @RequestBody Country country){
        return countryService.update(id, country);
    }

    @DeleteMapping("/{id}")
    public Country delete(@PathVariable Integer id){
        return countryService.delete(id);
    }
}
