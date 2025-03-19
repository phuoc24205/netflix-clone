import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import MovieCard from "./MovieCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Row = ({ title, movies, isLoading, fetchMoreMovies }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [visibleMovies, setVisibleMovies] = useState([]);

  useEffect(() => {
    setVisibleMovies(movies.slice(0, 10)); // Lấy 10 phim đầu tiên
  }, [movies]);

  // Xử lý khi Swiper đến cuối cùng -> Tải thêm phim
  const handleReachEnd = () => {
    if (visibleMovies.length < movies.length) {
      setVisibleMovies((prev) => [
        ...prev,
        ...movies.slice(prev.length, prev.length + 10),
      ]);
    }
  };

  return (
    <div className="filmSwiper relative mt-3 mb-13 overflow-visible pl-8 text-white">
      <h2 className="mb-2 font-bold">{title}</h2>
      <div ref={prevRef} className="swiper-button-prev max-sm:hidden"></div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={"auto"}
        spaceBetween={20}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        breakpoints={{
          640: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 10 },
          768: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 10 },
          1024: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 10 },
        }}
        pagination={{ clickable: true }}
        loop={false}
        onReachEnd={handleReachEnd} // Gọi hàm khi chạm slide cuối
      >
        {visibleMovies.map((movie) => (
          <SwiperSlide key={movie.id} className="custom-slide">
            <MovieCard
              isLoading={isLoading}
              movie={{
                id: movie.id,
                title: movie.title,
                img: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
                release_date: movie.release_date,
                genreIds: movie.genre_ids,
                overview: movie.overview,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div ref={nextRef} className="swiper-button-next max-sm:hidden"></div>
    </div>
  );
};

export default Row;
