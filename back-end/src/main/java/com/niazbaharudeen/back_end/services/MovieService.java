package com.niazbaharudeen.back_end.services;

import java.util.List;

import com.niazbaharudeen.back_end.dtos.MovieResponseDTO;

public interface MovieService {

    List<MovieResponseDTO> getPopularMovies();

    List<MovieResponseDTO> searchMovies(String query);
}
