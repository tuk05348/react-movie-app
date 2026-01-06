package com.niazbaharudeen.back_end.services;

import java.util.List;

import com.niazbaharudeen.back_end.dtos.MovieRequestDTO;
import com.niazbaharudeen.back_end.dtos.MovieResponseDTO;

public interface MovieService {

    List<MovieResponseDTO> getPopularMovies();

    List<MovieResponseDTO> searchMovies(String query);

    void favoriteMovie(MovieRequestDTO movieRequestDTO);

    List<MovieResponseDTO> getFavoriteMovies();
}
