package com.niazbaharudeen.back_end.dtos;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResultsResponseDTO {

    private List<MovieResponseDTO> movieResponseDTOs;
}
