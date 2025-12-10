import MovieCard from "../components/MovieCard";

function Home() {
  //dummy array of movies
  const movies = [
    { id: 1, title: "John Wick", release_date: 2020 },
    { id: 2, title: "Terminator", release_date: 1984 },
    { id: 3, title: "The Matrix", release_date: 1999 },
  ];

  const handleSearch = () => {};
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
        ></input>
        <button type="submit" className="search-btn">
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
