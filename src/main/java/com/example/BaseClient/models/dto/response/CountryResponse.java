package com.example.BaseClient.models.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CountryResponse {
    private Integer regionId;
    private String regionName;
    private Integer countryId;
    private String countryCode;
    private String countryName;
}
