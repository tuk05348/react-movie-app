import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { getPopularMovies } from "../services/api";
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
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        setError("Failed to load movies...");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []); //pass function and then dependency array
  //we check whatever is inside the array after we rerender, and if it changed, we run the
  //effect again, if nothing is inside it only runs once

  const handleSearch = (e) => {
    e.preventDefault();
    alert(searchQuery);
  };
  //use map function to map each movie in the array using an anonymous function
  //each movie is mapped to a movie card, the movie is passed as a prop
  //for map to work, the key property is needed so React knows which component to update
  //returns a skeleton home page with a search form and a grid of movies
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
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
