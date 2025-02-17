import React from "react";
import Navbar from "../Components/Navbar";
import ModalMovie from "../Components/ModalMovie";
import { MovieProvider } from "../Context/MovieContext";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <MovieProvider>
        {children}
        <ModalMovie />
      </MovieProvider>
    </div>
  );
};

export default React.memo(Layout);
