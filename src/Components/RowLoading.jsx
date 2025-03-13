import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
const RowLoading = ({ title }) => {
  return (
    <div className="filmSwiper relative mt-3 mb-13 overflow-visible pl-8 text-white">
      <h2 className="mb-2 font-bold">{title}</h2>
      <div className="flex space-x-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="h-[100px] w-[400px] animate-pulse rounded-lg bg-gray-700"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default RowLoading;
