import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Row from "../Components/Row";
import { fetchAllMoviesByGenres } from "../Axios/MovieService";
import { MovieProvider, useMovie } from "../Context/MovieContext";
import ModalMovie from "../Components/ModalMovie";
import ResultMovie from "../Components/ResultMovie";
import useFetchMoviesByGenres from "../CustomHook/useFetchMoviesByGenre";
import Layout from "./Layout";
import Footer from "../Components/Footer";
const Home = () => {
  const moviesByGenre = useFetchMoviesByGenres();
  const renderMovieContent = () => {
    return Object.keys(moviesByGenre).map((genre) => (
      <Row key={genre} title={genre.toString()} movies={moviesByGenre[genre]} />
    ));
  };
  return (
    <Layout>
      <Banner />
      {renderMovieContent()}
      <Footer></Footer>
    </Layout>
  );
};

export default Home;
