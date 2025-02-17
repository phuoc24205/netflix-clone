import React, { useEffect, useState } from "react";
import banner from "../assets/banner.jpg";
import title from "../assets/banner-title.png";
import { fetchAllMovie } from "../Axios/MovieService";

const Banner = () => {
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetchAllMovie(); // Gọi hàm API
        console.log(response.data.results[0]);
        setMovieList(response.data.results[0]);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phim:", error);
      }
    };
    fetchMovies();
  }, []);
  return (
    <div
      className="banner relative z-0 h-screen bg-[url(../assets/banner.jpg)] bg-cover bg-center bg-no-repeat object-cover py-4 max-lg:h-full"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieList.backdrop_path})`,
      }}
    >
      <div className="container flex w-screen flex-col px-2 text-white sm:px-4 md:px-5 lg:px-8 xl:px-10">
        <h1 className="mt-50 text-3xl font-bold text-nowrap uppercase drop-shadow-lg sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl">
          {movieList.title}
        </h1>
        <p className="mt-4 w-[50%] text-wrap shadow-2xl drop-shadow-lg select-none">
          {movieList.overview}
        </p>
        <div className="flex items-center justify-between drop-shadow-xs">
          <div className="banner-right flex gap-4">
            <div className="mt-4 flex items-center rounded-sm bg-white px-[25px] py-[5px] text-[18px] font-bold text-black outline-0 hover:cursor-pointer hover:bg-[rgba(255,255,255,0.5)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-play"
                viewBox="0 0 16 16"
              >
                <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z" />
              </svg>
              <button className="w-full select-none hover:cursor-pointer">
                Phát
              </button>
            </div>
            <div className="mt-4 flex items-center rounded-sm bg-[rgba(255,255,255,0.2)] px-[25px] py-[5px] text-[18px] font-bold text-white outline-0 hover:cursor-pointer hover:bg-[rgba(255,255,255,0.1)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-info-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
              </svg>
              <button className="w-full drop-shadow-xs select-none hover:cursor-pointer">
                Thông tin khác
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
