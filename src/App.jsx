import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage";
import SearchPage from "./Pages/SearchPage";
import { MovieProvider } from "./Context/MovieContext";
import Layout from "./Pages/Layout";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <MovieProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre/:genreId" element={<Home />} />
        <Route path="/search/:keyword" element={<SearchPage />} />
      </Routes>
    </MovieProvider>
  );
}

export default App;
