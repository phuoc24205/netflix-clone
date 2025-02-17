import React from "react";
import film1 from "../assets/film1.jpg";
import MovieCard from "./MovieCard";
import { MovieProvider } from "../Context/MovieContext";
import ModalMovie from "./ModalMovie";
import Navbar from "./Navbar";
const ResultMovie = ({ movies }) => {
  return (
    <div className="relative container mx-auto overflow-visible pt-5 text-white">
      <h3 className="mt-20 mb-20 text-[30px]">Kết quả tìm kiếm</h3>
      <div className="grid grid-cols-3 gap-5 px-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie) => {
          return (
            <MovieCard
              key={`movieSearch + ${movie.id}`}
              movie={{
                id: movie.id,
                title: movie.title,
                img: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
              }}
            ></MovieCard>
          );
        })}
      </div>
    </div>
  );
};

export default ResultMovie;
