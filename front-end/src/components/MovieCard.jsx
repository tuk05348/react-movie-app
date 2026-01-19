import { useEffect, useState } from "react";
import "../css/MovieCard.css";
import { favoriteMovie } from "../services/api";

function MovieCard({ movie, setClicked }) {
  const [movieStatus, setMovieStatus] = useState(false);

  useEffect(() => {
    setMovieStatus(movie.isFavorited);
  }, []);

  // function for click on favorite button
  async function onFavoriteClick() {
    movie.isFavorited = !movie.isFavorited;
    setMovieStatus(movie.isFavorited);
    await favoriteMovie(movie); // favorite the movie that was clicked using the API service method
    setClicked(true);
  }

  //returns a movie card with movie info and image arranged on it
  //has a favorite button to favorite the movie
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={movie.poster_path} alt={movie.title} />
      </div>
      <div className="movie-overlay">
        <button
          className={`favorite-btn ${movieStatus ? "active" : ""}`}
          onClick={onFavoriteClick}
        >
          ♥
        </button>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
      </div>
    </div>
  );
}

export default MovieCard;
