import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./Pages/HomePage";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./Pages/SearchPage";
import { MovieProvider } from "./Context/MovieContext";
import Layout from "./Pages/Layout";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <MovieProvider>
                <Home />
              </MovieProvider>
            }
          ></Route>
          <Route path="/genre/:genreId" element={<Home />}></Route>
          <Route path="/search/:keyword" element={<SearchPage />}></Route>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
