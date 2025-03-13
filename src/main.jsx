import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { MovieProvider } from "./Context/MovieContext.jsx";
import "./App.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/netflix-clone">
      <App />
    </BrowserRouter>
  </StrictMode>,
);
