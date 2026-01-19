import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { getPopularMovies, searchMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  //defines state and the function to update state
  //when state is changed, the component rerenders
  //setSearchQuery called onChange
  //state persists across rerenders until a page refresh
  const [searchQuery, setSearchQuery] = useState("");

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //use effect lets you define side effects in your component and when they should run
  //this runs only once when the component renders
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        // use the API service function to get popular movies from TMDB
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies); // change state, set movies to the popular movies we got
      } catch (err) {
        // if it failed to get movies and returned an error
        setError("Failed to load movies..."); // set error state to the following message
        console.log(err); // log error in console
      } finally {
        setLoading(false); // after movie loading and error handling is done set loading state to false
      }
    };

    loadPopularMovies(); // call the loadPopularMovies function
  }, []); //pass function and then dependency array
  //we check whatever is inside the array after we rerender, and if it changed, we run the
  //effect again, if nothing is inside it only runs once

  // function to handle when the user searches for a movie
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return; // if the search query is empty, return nothing
    if (loading) return;

    setLoading(true);

    try {
      // if the search query is valid
      const searchResults = await searchMovies(searchQuery); // call the search api
      setMovies(searchResults); // once the results have arrived, set them in state
      setError(null);
    } catch (err) {
      // catch any errors and set the error state and message
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      // complete loading
      setLoading(false);
    }

    setSearchQuery(""); // after the search is done, clear the search bar
  };
  // use map function to map each movie in the array using an anonymous function
  // each movie is mapped to a movie card, the movie is passed as a prop
  // for map to work, the key property is needed so React knows which component to update
  // returns a home page with a search form and a grid of movies
  // a void function with a 0 expression is passed for setClicked since that function is used
  // by the MovieCard to update state on the Favorites page, so the Home page doesn't need it
  // use conditional rendering to show error messages
  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies ..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        ></input>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} setClicked={() => void 0} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
