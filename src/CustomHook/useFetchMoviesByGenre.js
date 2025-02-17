import { useState, useEffect } from "react";
import { fetchAllMoviesByGenres } from "../Axios/MovieService";

const useFetchMoviesByGenres = () => {
  const [moviesByGenre, setMoviesByGenre] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const movieList = await fetchAllMoviesByGenres();
        setMoviesByGenre(movieList);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchGenres();
  }, []);

  return moviesByGenre;
};

export default useFetchMoviesByGenres;
