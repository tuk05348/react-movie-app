import "../css/MovieCard.css";
import { favoriteMovie } from "../services/api";

function MovieCard({ movie, setClicked }) {
  //skeleton function for click on favorite button
  async function onFavoriteClick() {
    await favoriteMovie(movie);
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
        <button className="favorite-btn" onClick={onFavoriteClick}>
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
