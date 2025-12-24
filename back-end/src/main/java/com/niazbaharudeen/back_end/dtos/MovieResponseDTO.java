package com.niazbaharudeen.back_end.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MovieResponseDTO {

    private String title;

    @JsonProperty("poster_path") // map url of movie image to the JSON property in the response
    private String url;

    private String releaseDate;

}
