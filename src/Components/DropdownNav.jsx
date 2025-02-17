import React from "react";
import useDropdown from "../CustomHook/useDropDown";

const DropdownNav = ({ title }) => {
  const { isOpen, toggleDropdown, dropdownRef } = useDropdown();

  return (
    <div className="">
      <div className="relative w-full">
        <button
          ref={dropdownRef}
          onClick={toggleDropdown}
          className="flex items-center"
        >
          <span>{title}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-down-fill"
            viewBox="0 0 16 16"
          >
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute left-[50%] z-50 mt-3 inline-flex w-fit -translate-x-[50%] flex-nowrap items-center justify-center bg-black px-4 text-center text-nowrap">
            <div className="absolute top-0 left-0 w-full bg-white py-[0.5px]"></div>
            <ul className="py-3">
              {["Trang chủ", "Series", "Phim", "Danh sách của tôi"].map(
                (item) => {
                  return (
                    <li className="z-50 text-[16px] text-white hover:cursor-pointer">
                      {item}
                    </li>
                  );
                },
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownNav;
