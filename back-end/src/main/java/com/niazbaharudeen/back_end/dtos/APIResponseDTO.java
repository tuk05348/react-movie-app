package com.niazbaharudeen.back_end.dtos;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class APIResponseDTO {

    @JsonProperty("results")
    private List<MovieResponseDTO> movieResponseDTOs;
}
