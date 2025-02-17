import { useEffect, useState } from "react";
import { getGenres } from "../Axios/MovieService";
import Dropdown from "./Dropdown";

const CategoryDropdown = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const gen = await getGenres();
        if (Array.isArray(gen)) {
          setGenres(gen);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách thể loại:", error);
      }
    };

    fetchGenres();
  }, []);

  return <Dropdown title="Thể loại" items={genres} />;
};

export default CategoryDropdown;
