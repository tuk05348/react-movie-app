package com.niazbaharudeen.back_end.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.niazbaharudeen.back_end.dtos.MovieResponseDTO;
import com.niazbaharudeen.back_end.services.MovieService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MovieController {

    private final MovieService movieService;

    @GetMapping("/popular")
    public List<MovieResponseDTO> getPopularMovies() {
        return movieService.getPopularMovies();
    }

    @GetMapping("/search")
    public List<MovieResponseDTO> searchMovies(@RequestParam String query) {
        return movieService.searchMovies(query);
    }

}
