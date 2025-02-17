import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const [isSearchActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const toggleSearch = () => {
    setIsActive((prevState) => {
      return !prevState;
    });
  };
  const handleChange = async (e) => {
    const value = e.target.value;
    if (value.length > 0) {
      navigate(`/search/${value}`);
    } else {
      navigate(`/`);
    }
  };
  return (
    <div className="relative z-30 h-[20px] w-[20px]">
      <svg
        onClick={toggleSearch}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className={`bi bi-search absolute top-0 left-0 z-30 cursor-pointer ps-[3px] select-none ${isSearchActive ? "left-[-215px] transition-all duration-300 ease-in-out" : ""}`}
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
      </svg>
      <input
        type="text"
        onChange={handleChange}
        className={`${
          isSearchActive
            ? "1 w-[240px] pl-[35px] transition-all duration-300 ease-in-out"
            : "w-0 border-none outline-none select-none"
        } absolute top-[-5px] right-0 z-15 h-[30px] border-2 border-transparent bg-[rgba(1,0,0,0.9)] py-1 text-[16px] outline-1 focus-within:outline-1 focus-within:outline-white`}
        placeholder="Titles, people, genres"
      />
    </div>
  );
};

export default React.memo(Search);
