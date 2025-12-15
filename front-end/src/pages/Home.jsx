import MovieCard from "../components/MovieCard";
import { useState } from "react";
import "../css/Home.css";

function Home() {
  //defines state and the function to update state
  //when state is changed, the component rerenders
  //setSearchQuery called onChange
  //state persists across rerenders until a page refresh
  const [searchQuery, setSearchQuery] = useState("");

  //dummy array of movies
  const movies = [
    { id: 1, title: "John Wick", release_date: 2020 },
    { id: 2, title: "Terminator", release_date: 1984 },
    { id: 3, title: "The Matrix", release_date: 1999 },
  ];

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
