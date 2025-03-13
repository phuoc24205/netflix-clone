import React, { useEffect, useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { getMoviesByKeyWord } from "../Axios/MovieService";
import Layout from "./Layout";
import Footer from "../Components/Footer";

// Lazy load các component
const ResultMovie = lazy(() => import("../Components/ResultMovie"));

const Search = () => {
  const { keyword } = useParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log(keyword);
        const moviesData = await getMoviesByKeyWord(keyword);
        setMovies(moviesData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phim:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [keyword]);

  return (
    <div className="search">
      <Layout>
        <Suspense
          fallback={
            <div className="p-4 text-center text-white">Loading...</div>
          }
        >
          <ResultMovie movies={movies} isLoading={isLoading} />
        </Suspense>
        <Footer />
      </Layout>
    </div>
  );
};

export default Search;
