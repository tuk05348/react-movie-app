package com.niazbaharudeen.back_end.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.niazbaharudeen.back_end.dtos.MovieRequestDTO;
import com.niazbaharudeen.back_end.dtos.MovieResponseDTO;
import com.niazbaharudeen.back_end.services.MovieService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MovieController {

    private final MovieService movieService;

    // GET: First page of Popular Movies from The Movie Database
    @GetMapping("/popular")
    public List<MovieResponseDTO> getPopularMovies() {
        return movieService.getPopularMovies();
    }

    // GET: All movies that match user-provided search query
    @GetMapping("/search")
    public List<MovieResponseDTO> searchMovies(@RequestParam String query) {
        return movieService.searchMovies(query);
    }

    // POST: Favorite/Unfavorite a movie
    @PostMapping("/favorite")
    public void favoriteMovie(@RequestBody MovieRequestDTO movieRequestDTO) {
        movieService.favoriteMovie(movieRequestDTO);
    }

    // GET: All movies favorited by a user
    @GetMapping("/favoriteMovies")
    public List<MovieResponseDTO> getFavoriteMovies() {
        return movieService.getFavoriteMovies();
    }

}
