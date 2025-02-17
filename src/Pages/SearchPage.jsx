import React, { useEffect, useState } from "react";
import ResultMovie from "../Components/ResultMovie";
import { useParams } from "react-router-dom";
import { getMoviesByKeyWord } from "../Axios/MovieService";

import Layout from "./Layout";
const Search = () => {
  const { keyword } = useParams();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log(keyword);
        const moviesData = await getMoviesByKeyWord(keyword);
        setMovies(moviesData); // Lưu kết quả vào state
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phim:", error);
      }
    };

    fetchMovies();
  }, [keyword]);
  return (
    <div className="search">
      <Layout>
        <ResultMovie movies={movies}></ResultMovie>
      </Layout>
    </div>
  );
};

export default Search;
