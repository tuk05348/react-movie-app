import MovieCard from "../components/MovieCard";
import "../css/Favorites.css";
import { getFavoriteMovies } from "../services/api";
import { useState, useEffect } from "react";

function Favorites() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const loadFavoriteMovies = async () => {
      try {
        const favoriteMovies = await getFavoriteMovies();
        setMovies(favoriteMovies);
        setClicked(false);
      } catch (err) {
        setError("Failed to load movies...");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadFavoriteMovies();
  }, [clicked]); //pass function and then dependency array
  //we check whatever is inside the array after we rerender, and if it changed, we run the
  //effect again, if nothing is inside it only runs once

  return (
    <div className="favorites">
      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} setClicked={setClicked} />
          ))}
        </div>
      )}

      {loading == false && movies.length == 0 && (
        <div className="favorites-empty">
          <h2>No favorite movies yet</h2>
          <p>Start adding movies to your favorites and they will appear here</p>
        </div>
      )}
    </div>
  );
}

export default Favorites;
