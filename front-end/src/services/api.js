const BASE_URL = "http://localhost:8080/movies";

export const getPopularMovies = async () => {
  const respose = await fetch(`${BASE_URL}/popular`);
  const data = await respose.json();
  return data;
};

export const searchMovies = async (query) => {
  const respose = await fetch(
    `${BASE_URL}/search?query=${encodeURIComponent(query)}`
  );
  const data = await respose.json();
  return data;
};

export const getFavoriteMovies = async () => {
  const respose = await fetch(`${BASE_URL}/favoriteMovies`);
  const data = await respose.json();
  return data;
};

export const favoriteMovie = async (movie) => {
  const respose = await fetch(`${BASE_URL}/favorite`, {
    method: "POST",
    body: JSON.stringify(movie),
  });
  const data = await respose.json();
  return data;
};
