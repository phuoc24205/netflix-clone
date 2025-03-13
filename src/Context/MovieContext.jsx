import React from "react";
import { useContext, createContext, useState } from "react";
const MovieContext = createContext();
export const MovieProvider = ({ children }) => {
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [movies, setMovies] = useState(null);
  const [movie, setMovie] = useState(null);
  const [isModalShow, setIsModalShow] = useState(null);
  return (
    <MovieContext.Provider
      value={{
        hoveredMovie,
        setHoveredMovie,
        movies,
        setMovies,
        isModalShow,
        setIsModalShow,
        movie,
        setMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
export const useMovie = () => {
  return useContext(MovieContext);
};
