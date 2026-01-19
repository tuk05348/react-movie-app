package com.niazbaharudeen.back_end.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class MovieRequestDTO {

    private Long externalId;

    private String title;

    private String url;

    private String releaseDate;

    private Boolean isFavorited;
}
