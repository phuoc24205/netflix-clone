import { useState, useEffect, useRef } from "react";
import { fetchAllMoviesByGenres, getGenres } from "../Axios/MovieService";

const useFetchMoviesByGenres = () => {
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const observerRef = useRef(null);
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreList = await getGenres();
        setGenres(genreList);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);
  const loadMoreVideos = async () => {
    if (currentIndex > genres.length || isLoading) return;
    setIsLoading(true);
    const genre = genres[currentIndex];
    console.log(genre?.id);
    if (genre?.id) {
      const movies = await fetchAllMoviesByGenres(genre?.id);
      setMoviesByGenre((prev) => ({
        ...prev,
        [genre?.name]: movies,
      }));
    }
    setCurrentIndex((prev) => prev + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreVideos();
        }
      },
      { threshold: 0.1 },
    );
    const target = document.querySelector("#loading");
    if (target) observerRef.current.observe(target);
    return () => observerRef.current.disconnect();
  }, [genres, currentIndex, isLoading]);
  return { moviesByGenre, isLoading };
};

export default useFetchMoviesByGenres;
