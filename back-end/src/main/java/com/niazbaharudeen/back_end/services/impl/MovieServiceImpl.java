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
    private Environment environment; // Autowire environment to get bearer token saved in properties file

    private final FavoriteMovieRepository favoriteMovieRepository;
    private final MovieMapper movieMapper;

    // Helper method to create a rest client to make calls to the TMDB API
    private RestClient createRestClient() {
        return RestClient.builder()
                .baseUrl("https://api.themoviedb.org/3") // base url of TMDB API
                .defaultHeaders( // set HTTP headers, accept JSON response
                        httpHeaders -> { // and set Bearer token
                            httpHeaders.set("accept", "application/json");
                            httpHeaders.set("Authorization", "Bearer " + environment.getProperty("env.api_token"));
                        })
                .build();
    }

    @Override
    public List<MovieResponseDTO> getPopularMovies() {
        // Call the external API with the Rest Client
        // Using Spring's native mapping and multiple data objects, get the list of
        // popular
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
        // Call TMDB's search movie API and provide the user's search query as query
        // params
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
        // Favorite/unfavorite a movie in the favorite movies repository depending on
        // whether the movie is in the DB
        // and if it is favorited/unfavorited
        Movie movie = movieMapper.dtoToEntity(movieRequestDTO); // convert movie request DTO to movie using mapper

        // Use the repository's derived query to check if the movie is in the DB and
        // store it as an optional
        Optional<Movie> checkMovie = favoriteMovieRepository.findByExternalId(movie.getExternalId());

        if (checkMovie.isPresent() && checkMovie.get().isDeleted()) { // if the movie is present and it is deleted
            movie.setDeleted(false); // set the isDeleted attribute to false since we're favoriting it
            movie.setId(checkMovie.get().getId()); // set id to the id of the existing movie in DB so it updates said
                                                   // entry on save and flush
        } else if (checkMovie.isPresent()) { // else if condition occurs only if movie is present and is not deleted
            movie.setDeleted(true); // set isDeleted to true since we are unfavoriting an existing movie in the DB
            movie.setId(checkMovie.get().getId()); // set id to that of the existing movie to ensure it updates it
        }
        // save and flush the updated movie object
        favoriteMovieRepository.saveAndFlush(movie);
    }

    @Override
    public List<MovieResponseDTO> getFavoriteMovies() {
        // Get all the favorite movies from the repository that are not deleted using a
        // derived query
        // Use mapper to convert returned movies to movie response DTOs
        return movieMapper.entitiesToDTOs(favoriteMovieRepository.findAllByIsDeletedFalse());
    }

}
