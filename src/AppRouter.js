import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Movie from "./Movie";
import Book from "./Book";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/home" element={<App />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/book" element={<Book />} />

        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
