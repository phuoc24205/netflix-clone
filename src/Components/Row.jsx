import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import MovieCard from "./MovieCard";
import ModalMovie from "./ModalMovie";
import { useMovie } from "../Context/MovieContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Row = ({ title, movies }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  const handleOverlayMouseEnter = (event) => {
    event.stopPropagation(); // Ngừng sự kiện MouseEnter
  };

  return (
    <div className="filmSwiper relative mt-3 mb-13 overflow-visible pl-8 text-white">
      <h2 className="mb-2 font-bold">{title}</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={3}
        slidesPerGroup={3}
        spaceBetween={10}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        breakpoints={{
          // khi màn hình >= 640px
          640: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 10,
          },
          // khi màn hình >= 768px
          768: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 10,
          },
          // khi màn hình >= 1024px
          1024: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 10,
          },
        }}
        pagination={{ clickable: true }}
        loop={false}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="custom-slide">
            <MovieCard
              key={movie.id}
              movie={{
                id: movie.id,
                title: movie.title,
                img: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Thêm sự kiện vào các nút điều hướng */}
      <div
        onMouseEnter={handleOverlayMouseEnter}
        ref={prevRef}
        className="swiper-button-prev"
      ></div>
      <div
        onMouseEnter={handleOverlayMouseEnter}
        ref={nextRef}
        className="swiper-button-next xl:hidden"
      ></div>
    </div>
  );
};

export default Row;
