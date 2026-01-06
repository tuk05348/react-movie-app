package com.niazbaharudeen.back_end.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.niazbaharudeen.back_end.dtos.MovieRequestDTO;
import com.niazbaharudeen.back_end.dtos.MovieResponseDTO;
import com.niazbaharudeen.back_end.entities.Movie;

@Mapper(componentModel = "spring")
public interface MovieMapper {

    Movie dtoToEntity(MovieRequestDTO movieRequestDTO);

    List<MovieResponseDTO> entitiesToDTOs(List<Movie> movies);

}
