import React, { useState, useEffect } from "react";
import film1 from "../assets/film1.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useMovie } from "../Context/MovieContext";

const ModalMovie = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { hoveredMovie, setHoveredMovie } = useMovie();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  useEffect(() => {
    if (hoveredMovie) {
      setIsVisible(false);
      setTimeout(() => {
        setIsVisible(true);
      }, 200); // Giảm thời gian để tránh delay lâu quá
    }
  }, [hoveredMovie]);
  // Khi rời khỏi modal, ẩn modal đi
  const handleLeave = () => {
    setIsVisible(false);
  };
  if (!hoveredMovie) return null;

  return (
    <div
      style={{
        left: hoveredMovie?.left,
        right: hoveredMovie?.right,
        top: hoveredMovie?.top,
      }}
      onMouseLeave={handleLeave}
      className={`modal invisible absolute z-9999 h-auto w-[25%] scale-50 transform overflow-hidden rounded-md bg-gray-900 text-white opacity-0 transition-all duration-300 ease-out ${isVisible ? "visible z-9999 scale-100 opacity-100" : ""}`}
    >
      <img
        className="h-[180px] w-full overflow-hidden object-cover"
        src={hoveredMovie?.img || "error"}
        alt={hoveredMovie?.title || "Unknown"}
        onLoad={() => {
          setIsImageLoaded(true);
        }}
      />
      <div className="ms-2 flex w-full gap-2 pt-3 text-2xl">
        <i className="bi bi-play-fill rounded-4xl border-[2px] border-gray-400 px-1"></i>
        <i className="bi bi-plus rounded-4xl border-[2px] border-gray-400 px-1"></i>
        <i className="bi bi-x rounded-4xl border-[2px] border-gray-400 px-1"></i>
      </div>
      <div className="ms-2 flex items-center gap-4 pt-4">
        <p className="border px-[10px] pt-[2px]">T16</p>
        <p>12 tập</p>
        <p className="rounded-lg border px-[5px] pt-[1px] text-[10px]/5">HD</p>
      </div>
      <div className="ms-2 flex items-center gap-4 py-3">
        <p className="text-[15px]">{hoveredMovie?.title || "Unknown Movie"}</p>
      </div>
    </div>
  );
};

export default ModalMovie;
