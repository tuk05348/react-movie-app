package com.niazbaharudeen.back_end.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.niazbaharudeen.back_end.entities.Movie;

@Repository
public interface FavoriteMovieRepository extends JpaRepository<Movie, Long> {

    List<Movie> findAllByIsDeletedFalse();

    Optional<Movie> findByExternalId(Long externalId);
}