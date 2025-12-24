package com.niazbaharudeen.back_end.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.niazbaharudeen.back_end.dtos.APIResponseDTO;
import com.niazbaharudeen.back_end.dtos.MovieResponseDTO;

@Service
public class MovieService {

    private final RestClient restClient;

    @Autowired
    private Environment environment;

    public MovieService(RestClient.Builder restClientBuilder) {
        // create the external REST client with the base url of The Movie Database's API
        this.restClient = restClientBuilder.baseUrl("https://api.themoviedb.org/3").build();
    }

    public List<MovieResponseDTO> getPopularMovies() {
        // Call the external API and provide our API key
        // Using Spring's native mapping and multiple data objects, get the list of
        // movies from the JSON response
        APIResponseDTO apiResponseDTO = this.restClient.get()
                .uri("/movie/popular/?API_KEY={API_KEY}", environment.getProperty("API_KEY"))
                .retrieve().body(APIResponseDTO.class);
        return apiResponseDTO.getResultsResponseDTO().getMovieResponseDTOs();
    }

}
