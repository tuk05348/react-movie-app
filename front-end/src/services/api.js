const BASE_URL = "http://localhost:8080/movies";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/popular`);
  const data = await response.json();
  return data;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search?query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data;
};

export const getFavoriteMovies = async () => {
  const response = await fetch(`${BASE_URL}/favoriteMovies`);
  const data = await response.json();
  return data;
};

export const favoriteMovie = async (movie) => {
  const movieRequestDto = {
    externalId: movie.id,
    title: movie.title,
    url: movie.poster_path,
    releaseDate: movie.release_date,
  };

  await fetch(`${BASE_URL}/favorite`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(movieRequestDto),
  });
};
