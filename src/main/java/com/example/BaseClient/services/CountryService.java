package com.example.BaseClient.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.BaseClient.models.Country;
import com.example.BaseClient.models.dto.request.CountryRequest;
import com.example.BaseClient.models.dto.response.CountryResponse;

@Service
public class CountryService {
    @Value("${server.base.url}/country")
    private String url;

    @Autowired
    private RestTemplate restTemplate;

    public List<CountryResponse> getAllCustom() {
        return restTemplate.exchange(url.concat("/all"), HttpMethod.GET, null, new ParameterizedTypeReference<List<CountryResponse>>() {
        }).getBody();
    }

    public Country getById(Integer id) {
        return restTemplate.exchange(url.concat("/" + id), HttpMethod.GET, null, Country.class).getBody();
    }

    public Country createCustom(CountryRequest countryRequest) {
        return restTemplate
                .exchange(url, HttpMethod.POST, new HttpEntity<CountryRequest>(countryRequest), Country.class)
                .getBody();
    }

    public Country update(Integer id, Country country){
        HttpEntity<Country> request = new HttpEntity<Country>(country);
        return restTemplate.exchange(url.concat("/" + id), HttpMethod.PUT, request, Country.class).getBody();
    }

    public Country delete(Integer id){
        return restTemplate.exchange(url.concat("/" + id), HttpMethod.DELETE, null, Country.class).getBody();
    }
}
