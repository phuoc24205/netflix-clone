import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useMovie } from "../Context/MovieContext";
import ModalMain from "./ModalMain";

const ModalMovie = () => {
  const { hoveredMovie, setHoveredMovie, setIsModalShow, setMovie } =
    useMovie();
  const ref = useRef(null);

  // Animation Variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 },
  };

  // Xử lý ẩn modal
  const handleLeave = useCallback(() => {
    setHoveredMovie(null);
  }, [setHoveredMovie]);

  return (
    <AnimatePresence mode="wait">
      {hoveredMovie && (
        <motion.div
          key={hoveredMovie.id} // 🚀 Đảm bảo mỗi movie có key riêng
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            left: hoveredMovie?.left,
            top: hoveredMovie?.top,
            right: hoveredMovie?.right,
          }}
          onMouseLeave={handleLeave}
          className="absolute z-[9999] w-[25%] overflow-hidden rounded-md bg-[#0d0d0e] pb-3 text-white"
        >
          <img
            ref={ref}
            className="h-full w-full object-cover"
            src={hoveredMovie?.img || "error"}
            alt={hoveredMovie?.title || "Unknown"}
          />
          <div className="ms-2 flex w-full gap-2 pt-3 text-2xl">
            <i
              onClick={() => {
                setMovie(hoveredMovie);
                setIsModalShow(true);
                handleLeave();
              }}
              className="bi bi-play-fill cursor-pointer rounded-4xl border-2 border-gray-400 px-1"
            ></i>
            <i className="bi bi-plus rounded-4xl border-2 border-gray-400 px-1"></i>
            <i className="bi bi-x rounded-4xl border-2 border-gray-400 px-1"></i>
          </div>
          <div className="ms-2 flex items-center gap-4 pt-4">
            <p className="border px-2 pt-1">T16</p>
            <p>12 tập</p>
            <p className="rounded-lg border px-2 pt-1 text-xs">HD</p>
          </div>
          <div className="ms-2 flex items-center gap-4 py-3">
            <p className="text-sm">{hoveredMovie?.title || "Unknown Movie"}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalMovie;
