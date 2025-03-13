import React from "react";
import ModalMovie from "../Components/ModalMovie";
import ModalMain from "../Components/ModalMain";
import { MovieProvider } from "../Context/MovieContext";

const Layout = ({ children }) => {
  return (
    <MovieProvider>
      <div className="mx-auto w-full max-w-[100vw]">
        {children}
        <ModalMovie />
        <ModalMain></ModalMain>
      </div>
    </MovieProvider>
  );
};

export default React.memo(Layout);
