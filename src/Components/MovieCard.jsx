import React, { useCallback, useRef } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useMovie } from "../Context/MovieContext";
import isMobile from "../Helpers/IsMobile";

const MovieCard = ({ movie, isLoading }) => {
  const { setHoveredMovie, setIsModalShow, setMovie } = useMovie();
  const timeoutRef = useRef(null);

  const handleMouseEnter = useCallback((movie, event) => {
    if (isMobile() || isLoading) return;
    const rect = event.currentTarget.getBoundingClientRect();

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const viewportWidth = window.innerWidth;
      let newLeft = rect.left + window.scrollX - 50;
      let newRight = rect.right + window.scrollX - 150;

      if (rect.left <= 35) {
        newLeft = 0;
        newRight = null;
      } else if (rect.right > viewportWidth - 100) {
        newRight = 0;
        newLeft = null;
      }

      if (newLeft !== null || newRight !== null) {
        setHoveredMovie({
          ...movie,
          top: rect.top + window.scrollY - 50,
          left: newLeft,
          right: newRight,
          show: true,
        });
      }
    }, 500);
  });

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  });

  const handleClick = useCallback(() => {
    if (!isMobile() || isLoading) return;
    setMovie(movie);
    setIsModalShow(true);
  });

  return (
    <div
      className="group relative z-0 overflow-visible"
      onMouseEnter={(event) => handleMouseEnter(movie, event)}
      onMouseLeave={handleMouseLeave}
    >
      {isLoading ? (
        <div className="h-[130px] w-auto animate-pulse rounded-lg bg-gray-700"></div>
      ) : (
        <img
          loading="lazy"
          className="left-0 z-0 h-[130px] min-h-[130px] w-[250px] max-w-[250px] min-w-[250px] rounded-lg object-cover shadow-md"
          src={movie.img}
          alt="Movie"
          sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, 1200px"
          onClick={handleClick}
        />
      )}
    </div>
  );
};

export default MovieCard;
