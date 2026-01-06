package com.niazbaharudeen.back_end.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.niazbaharudeen.back_end.dtos.APIResponseDTO;
import com.niazbaharudeen.back_end.dtos.MovieRequestDTO;
import com.niazbaharudeen.back_end.dtos.MovieResponseDTO;
import com.niazbaharudeen.back_end.entities.Movie;
import com.niazbaharudeen.back_end.mappers.MovieMapper;
import com.niazbaharudeen.back_end.repositories.FavoriteMovieRepository;
import com.niazbaharudeen.back_end.services.MovieService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MovieServiceImpl implements MovieService {

    @Autowired
    private Environment environment;

    private final FavoriteMovieRepository favoriteMovieRepository;
    private final MovieMapper movieMapper;

    private RestClient createRestClient() {
        return RestClient.builder()
                .baseUrl("https://api.themoviedb.org/3")
                .defaultHeaders(
                        httpHeaders -> {
                            httpHeaders.set("accept", "application/json");
                            httpHeaders.set("Authorization", "Bearer " + environment.getProperty("env.api_token"));
                        })
                .build();
    }

    @Override
    public List<MovieResponseDTO> getPopularMovies() {
        // Call the external API and provide our API key
        // Using Spring's native mapping and multiple data objects, get the list of
        // movies from the JSON response
        RestClient restClient = createRestClient();
        APIResponseDTO apiResponseDTO = restClient
                .get()
                .uri("/movie/popular")
                .retrieve()
                .body(APIResponseDTO.class);
        return apiResponseDTO.getMovieResponseDTOs();
    }

    @Override
    public List<MovieResponseDTO> searchMovies(String query) {
        RestClient restClient = createRestClient();
        APIResponseDTO apiResponseDTO = restClient
                .get()
                .uri("/search/movie?query={query}", query)
                .retrieve()
                .body(APIResponseDTO.class);
        return apiResponseDTO.getMovieResponseDTOs();
    }

    @Override
    public void favoriteMovie(MovieRequestDTO movieRequestDTO) {
        Movie movie = movieMapper.dtoToEntity(movieRequestDTO);

        Optional<Movie> checkMovie = favoriteMovieRepository.findbyExternalId(movie.getExternalId());

        if (checkMovie.isPresent() && checkMovie.get().isDeleted()) {
            movie.setDeleted(false);
        } else if (checkMovie.isPresent()) {
            movie.setDeleted(true);
        }

        favoriteMovieRepository.saveAndFlush(movie);
    }

    @Override
    public List<MovieResponseDTO> getFavoriteMovies() {
        return movieMapper.entitiesToDTOs(favoriteMovieRepository.findAllByDeletedFalse());
    }

}
