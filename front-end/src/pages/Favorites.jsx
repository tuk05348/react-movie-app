import MovieCard from "../components/MovieCard";
import "../css/Favorites.css";
import { getFavoriteMovies } from "../services/api";
import { useState, useEffect } from "react";

function Favorites() {
  // create state variables and setters for them
  const [movies, setMovies] = useState([]); // movies array
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // tracks if a movie's favorite button has been clicked
  const [clicked, setClicked] = useState(false);

  // use effect to load favorite movies
  useEffect(() => {
    const loadFavoriteMovies = async () => {
      try {
        // call the get favorite movies endpoint and await its response
        const favoriteMovies = await getFavoriteMovies();
        setMovies(favoriteMovies); // change state of movies, set it to the favorite movies we just got
        setClicked(false); // change state of clicked back to false, on render/rerender no movies have been clicked
      } catch (err) {
        // catch any errors, set the error message and log the error to console
        setError("Failed to load movies...");
        console.log(err);
      } finally {
        // after either getting movies or catching an error, set loading state to false
        setLoading(false);
      }
    };

    loadFavoriteMovies(); // load favorite movies
  }, [clicked]);
  // we pass the clicked state variable to the dependency array to run the effect again
  // when the favorite button is clicked on the favorites page, it unfavorites a movie
  // removing it from the movies array

  // conditional rendering to show the error message if an error is present
  // or depending on the loading state, show a loading message if movies are being fetiched
  // and if loading is false show the movies grid with the movies stored in state loaded in
  // pass the setClicked state function to each movie so we know when the favorite button has
  // been clicked
  // finally, if loading is complete but the movies array is empty
  // show a no movies message and encourage the user to add movies to their favorites
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
