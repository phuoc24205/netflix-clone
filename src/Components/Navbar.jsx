import React, { useEffect } from "react";
import logo from "../assets/Logonetflix.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import Search from "./Search";
import CategoryDropdown from "./CategoryDropdown";
import Dropdown from "./Dropdown";
import DropdownNav from "./DropdownNav";
const Navbar = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log("navbar rerender");
  return (
    <>
      <div className="fixed top-0 z-10 mx-auto w-full">
        <nav
          className={`${!isAtTop ? "bg-[#0D0D0D]" : ""} absolute top-0 w-full transition duration-800 ease-in-out`}
        >
          <div className="mx-auto flex w-full items-center justify-between px-4 py-4 text-xs text-white sm:text-sm md:text-base lg:text-lg xl:text-lg">
            <div className="navbar-left relative z-0 flex items-center gap-10">
              <div>
                <img
                  className="object-cover max-sm:w-15 sm:w-15 md:w-20 lg:w-25 xl:w-25"
                  src={logo}
                  alt=""
                />
              </div>
              <div className="z-100 xl:hidden">
                <DropdownNav title="Duyệt tìm"></DropdownNav>
              </div>
              <ul className="relative z-0 flex flex-nowrap gap-3 max-[1200px]:hidden">
                <li className="hover:cursor-pointer hover:text-gray-300">
                  <Link to="/">Trang chủ</Link>
                </li>
                <li>
                  <Link to="/genre/83">Series</Link>
                </li>
                <li>
                  <Link to="/genre/1234">Phim</Link>
                </li>
                <li>Mới & Phổ biến</li>
                <li>Danh sách của tôi</li>
                <li>Duyệt tìm ngôn ngữa</li>
              </ul>
            </div>
            <div className="navbar-right relative z-20 flex items-center gap-3">
              <Search></Search>
              <button className="bg-red-600 p-2 hover:cursor-pointer">
                Đăng nhập
              </button>
            </div>
          </div>
          <div className="mx-auto pb-4 sm:px-4 md:px-5 lg:px-8 xl:px-5">
            <CategoryDropdown></CategoryDropdown>
          </div>
        </nav>
      </div>
    </>
  );
};

export default React.memo(Navbar);
