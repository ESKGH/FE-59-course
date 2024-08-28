import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./styles.scss"

export const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=92ff7663`)
      .then(response => response.json())
      .then(data => setMovie(data));
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-details">
    <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
    <div className="movie-info">
      <h1>{movie.Title}</h1>
      <p className="genre"><span>Genre:</span> {movie.Genre}</p>
      <p className="release-date"><span>Release Date:</span> {movie.Released}</p>
      <p className="rating"><span>IMDB Rating:</span> {movie.imdbRating}</p>
      <p className="plot">{movie.Plot}</p>
    </div>
    <Link to="/" className="back-button">Back to Movies</Link>
  </div>
  );
};

