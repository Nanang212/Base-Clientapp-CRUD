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

import com.example.BaseClient.models.Region;
import com.example.BaseClient.models.dto.request.RegionRequest;
import com.example.BaseClient.models.dto.response.RegionResponse;
import com.example.BaseClient.services.RegionService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("api/region")
public class RestRegionController {
    private RegionService regionService;

    @GetMapping
    public List<Region> getAll(){
        return regionService.getAll();
    }

    @GetMapping("/{id}")
    public Region getById(@PathVariable Integer id){
        return regionService.getById(id);
    }

    @PostMapping
    public RegionResponse create(@RequestBody RegionRequest regionRequest){
        return regionService.create(regionRequest);
    }

    @PutMapping("/{id}")
    public Region update(@PathVariable Integer id, @RequestBody Region region){
        return regionService.update(id, region);
    }

    @DeleteMapping("/{id}")
    public Region delete(@PathVariable Integer id){
        return regionService.delete(id);
    }
}
