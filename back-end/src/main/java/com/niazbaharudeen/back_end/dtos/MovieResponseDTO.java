package com.niazbaharudeen.back_end.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MovieResponseDTO {

    private int id;

    private String title;

    @JsonProperty("poster_path") // map url of movie image to the JSON property in the response
    private String url;

    @JsonProperty("release_date")
    private String releaseDate;

    public void setUrl(String url) {
        this.url = "https://image.tmdb.org/t/p/w500" + url;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate.split("-")[0];
    }

}
