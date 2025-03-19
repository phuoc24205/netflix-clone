import React, { useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useMovie } from "../Context/MovieContext";

const ModalMovie = () => {
  const { hoveredMovie, setHoveredMovie, setIsModalShow, setMovie } =
    useMovie();
  const ref = useRef(null);

  // Xác định điểm neo (transformOrigin) dựa trên vị trí left/right
  const getTransformOrigin = () => {
    const left = hoveredMovie?.left;
    const right = hoveredMovie?.right;
    // Nếu left là số (tức modal nằm giữa), lấy center center
    if (typeof left === "string" && left.includes("%")) {
      return "center center";
    }
    if (left === "auto") return "right center";
    if (right === "auto") return "left center";

    return "left center"; // Mặc định nếu không xác định được
  };
  const getPostion = () => {
    if (hoveredMovie?.right) {
      return hoveredMovie?.right;
    }
    return hoveredMovie?.left;
  };
  // Animation Variants
  console.log(getTransformOrigin());
  const modalVariants = {
    hidden: {
      scale: 0.85,
      translateY: 0,
      transformOrigin: getTransformOrigin(),
    },
    visible: {
      scale: 1,
      translateY: -60,
      transformOrigin: getTransformOrigin(),
    },
    exit: {
      scale: 0.85,
      translateY: 0,
      transformOrigin: getTransformOrigin(),
    },
  };

  // Xử lý ẩn modal
  const handleLeave = useCallback(() => {
    setHoveredMovie(null);
  }, [setHoveredMovie]);

  return (
    <AnimatePresence mode="wait">
      {hoveredMovie && (
        <motion.div
          key={hoveredMovie.id}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: hoveredMovie.left,
            right: hoveredMovie.right,
            top: `${hoveredMovie.top}px`,
            zIndex: 9999,
          }}
          onMouseLeave={handleLeave}
          className="absolute z-[9999] w-[25%] max-w-[25%] overflow-hidden rounded-md bg-[#0d0d0e] pb-3 text-white shadow-lg"
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
                handleLeave();
                setMovie(hoveredMovie);
                setIsModalShow(true);
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
