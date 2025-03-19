import React, { useEffect, useRef, useState } from "react";
import { getGenreNameById } from "../Axios/MovieService";
import { useMovie } from "../Context/MovieContext";

const ModalMain = () => {
  const { isModalShow, setIsModalShow, movie } = useMovie();
  const [genres, setGenres] = useState([]);
  const modalRef = useRef(null);

  const genreIds = movie?.genreIds || [];

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await Promise.all(
          genreIds.map((id) => getGenreNameById(id)),
        );
        setGenres(genresData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thể loại:", error);
      }
    };

    if (genreIds.length > 0) {
      fetchGenres();
    }
  }, [genreIds]);

  useEffect(() => {
    document.documentElement.classList.toggle("modal-open", isModalShow);
  }, [isModalShow]);

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalShow(false);
    }
  };

  if (!isModalShow) return null;

  return (
    <div
      className="modal animate-fadeIn overflow-hidde fixed inset-0 z-[999] overflow-y-auto bg-[rgba(0,0,0,0.7)] pt-[50px]"
      onClick={handleCloseModal}
    >
      <div
        ref={modalRef}
        className="animate-slideUp relative left-[50%] z-[1000] w-full max-w-[900px] translate-x-[-50%] rounded-lg bg-black px-5 pb-[80px] text-yellow-100 max-sm:max-w-[450px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="verflow-hidden relative">
          <img
            className="h-[400px] w-full overflow-hidden rounded-lg object-cover"
            src={movie?.img}
            alt={movie?.title}
          />
          <div className="absolute bottom-10 left-10">
            <h1 className="text-4xl text-white">{movie?.title}</h1>
            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={() => console.log("click")}
                className="flex items-center rounded-sm bg-white px-5 py-1 text-lg font-bold text-black hover:bg-[rgba(255,255,255,0.5)]"
              >
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
                <span className="ml-2">Phát</span>
              </button>
              <i className="bi bi-plus transform rounded-full border-2 border-white px-[3px] text-2xl text-white"></i>
            </div>
          </div>
        </div>

        <div className="mt-3 flex justify-between gap-5 px-[40px] text-white max-sm:flex-col-reverse">
          <div>
            <p className="text-white">{movie?.release_date}</p>
            <p className="break-words whitespace-normal text-white">
              {movie?.overview}
            </p>
          </div>
          <div>
            <p className="w-[200px] text-[16px] text-white">
              Thể loại:{" "}
              {genres.map((genre, index) => (
                <a key={index} href="#">
                  {genre}
                  {index < genres.length - 1 ? ", " : ""}
                </a>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMain;
