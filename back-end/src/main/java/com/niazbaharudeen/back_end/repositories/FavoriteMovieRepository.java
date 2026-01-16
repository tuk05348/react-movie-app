package com.niazbaharudeen.back_end.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.niazbaharudeen.back_end.entities.Movie;

@Repository
public interface FavoriteMovieRepository extends JpaRepository<Movie, Long> {

    // Derived queries for the Favorite Movies database
    List<Movie> findAllByIsDeletedFalse(); // find all favorite movies not deleted

    Optional<Movie> findByExternalId(Long externalId); // find favorite by its TMDB id

    Boolean existsByExternalIdAndIsDeletedFalse(Long externalId); // check if movie is in favorites table and is not
                                                                  // deleted
}