package com.example.BaseClient.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Country {
    private Integer id;
    private String code;
    private String name;
    private Region region;
}
