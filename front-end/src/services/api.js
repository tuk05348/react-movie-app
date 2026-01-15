const BASE_URL = "http://localhost:8080/movies"; // base url for the movies API (localhost)

export const getPopularMovies = async () => {
  // get popular movies from the API
  const response = await fetch(`${BASE_URL}/popular`); // await a fetch of the popular movies endpoint
  const data = await response.json(); // await the json response
  return data; // return the popular movies
};

export const searchMovies = async (query) => {
  // get all movies matching the user's search query
  // await a fetch of the search endpoint
  // add a query param to the call with the encoded search query
  const response = await fetch(
    `${BASE_URL}/search?query=${encodeURIComponent(query)}`
  );
  const data = await response.json(); // await the json response
  return data; // return the matching movies
};

export const getFavoriteMovies = async () => {
  // get all movies favorites by the user
  // await a fetch of the favorite movies endpoint
  const response = await fetch(`${BASE_URL}/favoriteMovies`);
  const data = await response.json(); // await the json response
  return data; // return the favorite movies
};

export const favoriteMovie = async (movie) => {
  // post a movie to the favorite endpoint to be favorited/unfavorited
  // create a movie request JSON object to send in the request body
  // with keys matching those used by the DTOs in the back-end
  // and with data from the movie object populating the corresponding keys
  const movieRequestDto = {
    externalId: movie.id,
    title: movie.title,
    url: movie.poster_path,
    releaseDate: movie.release_date,
  };

  // await a POST to the favorite endpoint (it returns nothing except a response code)
  // set the content-type header to json and the method to POST
  // stringify the movie request JSON object
  await fetch(`${BASE_URL}/favorite`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(movieRequestDto),
  });
};
