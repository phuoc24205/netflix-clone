import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useDropdown from "../CustomHook/useDropDown";

const DropdownNav = ({ title }) => {
  const { isOpen, toggleDropdown, dropdownRef } = useDropdown();
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const newPosition = {
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      };
      setPosition((prev) =>
        JSON.stringify(prev) !== JSON.stringify(newPosition)
          ? newPosition
          : prev,
      );
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleDropdown(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={dropdownRef}
        onClick={toggleDropdown}
        className="relative flex items-center p-2 text-white"
      >
        <span>{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-caret-down-fill ml-2"
          viewBox="0 0 16 16"
        >
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
      </button>

      {isOpen &&
        position &&
        createPortal(
          <div
            className="absolute z-[9999] bg-black text-white shadow-lg"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              minWidth: `${position.width}px`,
            }}
          >
            <ul className="py-2">
              {["Trang chủ", "Series", "Phim", "Danh sách của tôi"].map(
                (item) => (
                  <li
                    key={item}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-700"
                  >
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>,
          document.body,
        )}
    </>
  );
};

export default DropdownNav;
