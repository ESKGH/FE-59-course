import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../pagination";
import "./styles.scss";

export const MainPage = ({ searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [selectedYear, setSelectedYear] = useState(''); // Состояние для фильтра по году
  const [selectedType, setSelectedType] = useState(''); // Состояние для фильтра по типу
  const moviesPerPage = 14;
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);
  const apiKey = '92ff7663';

  useEffect(() => {
    const fetchMovies = async () => {
      const allMovies = [];
      const movieQueries = ['rock', 'stone', 'hulk', 'thor', 'wonder woman', 'aquaman', 'joker', 'deadpool'];

      for (const query of movieQueries) {
        const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
        const data = await response.json();
        if (data.Search) {
          allMovies.push(...data.Search);
        }
      }
      setMovies(allMovies);
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    let filtered = movies;

    // Фильтрация по поисковому запросу
    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.Title && movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Фильтрация по году
    if (selectedYear) {
      filtered = filtered.filter(movie => movie.Year === selectedYear);
    }

    // Фильтрация по типу
    if (selectedType) {
      filtered = filtered.filter(movie => movie.Type === selectedType);
    }

    setFilteredMovies(filtered);
  }, [searchTerm, selectedYear, selectedType, movies]);

  useEffect(() => {
    // Рассчитываем фильмы для текущей страницы и обновляем состояние
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const current = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
    setCurrentMovies(current);
  }, [currentPage, filteredMovies]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  return (
    <>
      <div className="filters">
        <div className="filter">
          <label htmlFor="year">Year:</label>
          <input
            type="text"
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            placeholder="Enter year"
          />
        </div>

        <div className="filter">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
            <option value="game">Game</option>
          </select>
        </div>
      </div>

      <div className="movie-catalog">
        {currentMovies.length > 0 ? (
          currentMovies.map(movie => (
            <div className="movie-card" key={movie.imdbID}>
              <Link to={`/movie/${movie.imdbID}`}>
                <img src={movie.Poster} alt={movie.Title} />
                <h2>{movie.Title}</h2>
              </Link>
            </div>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <div style={{ margin: "50px" }}>
        <div>Результат: {count}</div>
        <button
          onClick={() => {
            dispatch({ type: "INCREMENT" });
            console.log("увеличить");
          }}
        >
          Увеличить
        </button>
        <button
          onClick={() => {
            dispatch({ type: "DECREMENT" });
            console.log("уменьшить");
          }}
        >
          Уменьшить
        </button>
      </div>
    </>
  );
};