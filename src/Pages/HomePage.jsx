import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import Row from "../Components/Row";

import useFetchMoviesByGenres from "../CustomHook/useFetchMoviesByGenre";
import Layout from "./Layout";
import Footer from "../Components/Footer";
import RowLoading from "../Components/RowLoading";
const Home = () => {
  const { moviesByGenre, isLoading } = useFetchMoviesByGenres();
  const renderMovieContent = () => {
    return Object.keys(moviesByGenre).map((genre) => (
      <Row
        isLoading={!moviesByGenre[genre]}
        key={genre}
        title={genre.toString()}
        movies={moviesByGenre[genre]}
      />
    ));
  };
  return (
    <Layout>
      <Banner />
      {renderMovieContent()}
      <div id="loading" style={{ height: "50px", textAlign: "center" }}>
        {isLoading && "Skeleton loading"}
      </div>
      <Footer></Footer>
    </Layout>
  );
};

export default Home;
