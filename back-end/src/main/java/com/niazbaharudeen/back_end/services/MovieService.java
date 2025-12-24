package com.niazbaharudeen.back_end.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.niazbaharudeen.back_end.dtos.MovieResponseDTO;
import com.niazbaharudeen.back_end.entities.Movie;

@Service
public class MovieService {

    private final RestClient restClient;

    @Autowired
    private Environment environment;

    public MovieService(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder.baseUrl("https://api.themoviedb.org/3").build();
    }

    public List<MovieResponseDTO> getPopularMovies() {
        return this.restClient.get().uri("/movie/popular/?API_KEY={API_KEY}", environment.getProperty("API_KEY"))
                .retrieve().body(new ParameterizedTypeReference<>() {
                });
    }

}
