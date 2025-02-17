import Axios from "./Axios";
export const fetchAllMovie = () => {
  return Axios.get("/movie/popular", {
    params: {
      language: "vi-VN",
      page: 1,
    },
  });
};

// Hàm lấy danh sách thể loại
export async function getGenres() {
  try {
    const response = await Axios.get("/genre/movie/list", {
      params: {
        language: "vi-VN",
      },
    });
    return response.data.genres; // Trả về danh sách thể loại
  } catch (error) {
    console.error("Lỗi khi lấy danh sách thể loại:", error);
    return [];
  }
}
// Hàm lấy danh sách phim theo thể loại
export async function getMoviesByGenre(genreId) {
  try {
    const response = await Axios.get("/discover/movie", {
      params: {
        language: "vi-VN",
        with_genres: genreId,
        page: 1, // Có thể thay đổi số trang để lấy nhiều dữ liệu hơn
      },
    });
    return response.data.results; // Trả về danh sách phim
  } catch (error) {
    console.error(`Lỗi khi lấy phim cho thể loại ${genreId}:`, error);
    return [];
  }
}
export async function getMoviesByKeyWord(keyword) {
  try {
    const response = await Axios.get("/search/movie", {
      params: {
        language: "vi-VN",
        query: keyword,
      },
    });
    return response.data.results; // Trả về danh sách phim
  } catch (error) {
    console.error(`Lỗi khi lấy phim cho thể loại ${keyword}:`, error);
    return [];
  }
}
export async function fetchAllMoviesByGenres() {
  try {
    const genres = await getGenres(); // Lấy danh sách thể loại
    const allMovies = {};

    for (const genre of genres) {
      const movies = await getMoviesByGenre(genre.id); // Lấy toàn bộ phim cho thể loại đó
      allMovies[genre.name] = movies; // Lưu phim theo thể loại
    }

    return allMovies;
  } catch (error) {
    console.error("Lỗi khi lấy tất cả phim theo thể loại:", error);
    return {};
  }
}
