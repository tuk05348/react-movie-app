# React Movie App Demo Project

This is a project meant to refresh and hone in my skills in React. The front-end, built in React, was coded following (this video)[https://www.youtube.com/watch?v=G6D9cBaLViA] from Tech with Tim and I do not claim credit for the Home page or CSS files. I am augmenting and modifying the project by adding a Spring back-end to securely handle API calls to the movie database. This project is purely education to enhance my own skills.

## Back-End Overview

The back-end is a RESTful API built using Spring Boot that makes calls to (The Movie Database API)[https://developer.themoviedb.org/docs/getting-started] to fetch movies for the front-end movie app. It also has a connection to a PostgreSQL database to hold movies that were favorited by users.

## Backend API Endpoints

**`GET movies/popular`**

Retrieves popular movies from The Movie Database.

**Response**

`['MovieResponseDTO']`

**`GET movies/search`**

Retrieves movies from The Movie Database that match the user's search query.

**Response**

`['MovieResponseDTO']`

**`GET movies/favoriteMovies`**

Retrieves movies that were favorited by the user.

**Response**

`['MovieResponseDTO']`

**`POST movies/favorite`**

Favorites a movie if it has not been favorited by the user and unfavorites a movie if it is currently a favorite.

**Request**

`{ // MovieRequestDTO

    externalId: 'number',

    title: 'string',

    url: 'string',

    releaseDate: 'string',

}`

**`GET movies/isFavorite`**

Returns whether a movie is currently favorited or not

**Response**
`[Boolean]`

## Front-End Overview

The front-end is a React project that displays movies from The Movie Database. There is a home page that shows popular movies, and a favorites page that shows movies favorited by the user.

Movies are displayed as cards. Each card shows the movie's title, release year, and an image of the movie poster. The card also contains a favorite button that favorites/unfavorites movies.
