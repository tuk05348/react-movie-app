import { useEffect, useState } from "react";
import "../css/MovieCard.css";
import { favoriteMovie, getMovieStatus } from "../services/api";

function MovieCard({ movie, setClicked, homePage }) {
  const [status, setStatus] = useState(false); // state for storing whether a movie is favorited or not

  // function for click on favorite button
  async function onFavoriteClick() {
    await favoriteMovie(movie); // favorite the movie that was clicked using the API service method
    setClicked(true); // use setClicked function (passed as prop) and set value to true
    setStatus(!status); // flip movie's favorite status
  }

  useEffect(() => {
    //useEffect for changing the favorite button depending on if the movie is favorited
    if (homePage) {
      //if the current page is the homepage
      const loadMovieStatus = async () => {
        try {
          // call the get movie status service function and pass it a movie
          const movieStatus = await getMovieStatus(movie);
          setStatus(movieStatus); // set movie status to what the function returns
        } catch (err) {
          // catch any errors
          console.log(err);
        }
      };

      loadMovieStatus(); // load the movie status
    } else {
      // if it's not the home page, then it must be the favorite page
      setStatus(true); // set favorite status to true since all movies on this page are favorites
    }
  }, []); // run use effect once, when the page renders

  //returns a movie card with movie info and image arranged on it
  //has a favorite button to favorite the movie
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={movie.poster_path} alt={movie.title} />
      </div>
      <div className="movie-overlay">
        <button
          className={`favorite-btn ${status ? "active" : ""}`}
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
