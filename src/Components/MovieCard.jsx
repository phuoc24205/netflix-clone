import React, { useCallback, useRef } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useMovie } from "../Context/MovieContext";
import isMobile from "../Helpers/IsMobile";

const MovieCard = ({ movie, isLoading }) => {
  const { setHoveredMovie, setIsModalShow, setMovie } = useMovie();
  const timeoutRef = useRef(null);

  const handleMouseEnter = useCallback(
    (movie, event) => {
      if (isMobile() || isLoading) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const modalWidthPercent = 25; // Modal rộng 25% màn hình

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        let newLeftPercent =
          ((rect.left + rect.width / 2) / viewportWidth) * 100 -
          modalWidthPercent / 2;
        let newRightPercent = null;

        // Nếu modal bị tràn lề phải
        if (newLeftPercent + modalWidthPercent > 95) {
          newRightPercent = 0;
          newLeftPercent = null;
        }

        // Nếu modal bị tràn lề trái
        else if (newLeftPercent < 5) {
          newLeftPercent = 0;
          newRightPercent = null;
        }

        setHoveredMovie({
          ...movie,
          top: rect.top + window.scrollY - 30,
          left:
            newLeftPercent !== null
              ? newLeftPercent === 0
                ? rect.left
                : `${newLeftPercent}%`
              : "auto",
          right:
            newRightPercent !== null
              ? newRightPercent === 0
                ? 50
                : `${newRightPercent}%`
              : "auto",
          width: rect.width,
          height: rect.height,
          show: true,
        });
      }, 300);
    },
    [setHoveredMovie, isLoading],
  );

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const handleClick = useCallback(() => {
    if (!isMobile() || isLoading) return;
    setMovie(movie);
    setIsModalShow(true);
  }, [isMobile, isLoading, setMovie, setIsModalShow, movie]);

  return (
    <div
      className="group relative z-0 overflow-visible"
      onMouseEnter={(event) => handleMouseEnter(movie, event)}
      onMouseLeave={handleMouseLeave}
    >
      {isLoading ? (
        <div className="h-[130px] w-auto min-w-[250px] animate-pulse rounded-lg bg-gray-700"></div>
      ) : (
        <img
          loading="lazy"
          className="left-0 z-0 h-full w-full rounded-lg object-cover shadow-md"
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
