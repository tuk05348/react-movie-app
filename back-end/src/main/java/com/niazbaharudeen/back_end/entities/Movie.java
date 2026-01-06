package com.niazbaharudeen.back_end.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
public class Movie {

    @Id
    @GeneratedValue
    private Long id;

    private String title;

    private String url;

    private String releaseDate;
}
