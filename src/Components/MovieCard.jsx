import React, { useRef, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useMovie } from "../Context/MovieContext";
import isMobile from "../Helpers/IsMobile";

const MovieCard = ({ movie }) => {
  const { setHoveredMovie } = useMovie();
  const timeoutRef = useRef(null); // Để lưu trữ id của setTimeout
  // Khi mouse enter, bắt đầu kiểm tra thời gian hover
  const handleMouseEnter = (movie, event) => {
    if (isMobile()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    console.log("enter");

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const viewportWidth = window.innerWidth;
      let newLeft = rect.left + window.scrollX - 35;
      let newRight = rect.right + window.scrollX - 30;

      // Adjust position conditions for more efficient calculation
      if (rect.left <= 35) {
        newLeft = 0;
        newRight = null;
      } else if (rect.right > viewportWidth - 100) {
        newRight = 0;
        newLeft = null;
      }

      // Only update state if there are changes in position (newLeft or newRight)
      if (newLeft !== null || newRight !== null) {
        setHoveredMovie({
          ...movie,
          top: rect.top + window.scrollY - 50,
          left: newLeft,
          right: newRight,
          show: true,
        });
      }
    }, 500); // Delay after 400ms
  };

  // Khi mouse leave, hủy bỏ timeout và ẩn movie
  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Hủy bỏ setTimeout nếu chuột rời đi
    }
  };

  return (
    <div
      className="group relative z-0 h-full w-full overflow-visible"
      onMouseEnter={(event) => handleMouseEnter(movie, event)}
      onMouseLeave={handleMouseLeave} // Hủy bỏ timeout khi chuột rời đi
    >
      <img
        loading="lazy"
        className="left-0 z-0 w-full rounded-lg object-cover shadow-md"
        src={movie.img}
        alt="Movie"
      />
    </div>
  );
};

export default MovieCard;
