import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useApi } from "./useApi";
import Movie from "./Movie";
import Book from "./Book";
import "./App.css";
export default function App() {
  const [bookData, setBookData] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const { data: bookApiData, error: bookError, setUrl: setBookUrl } = useApi();
  const {
    data: movieApiData,
    error: movieError,
    setUrl: setMovieUrl,
  } = useApi();

  useEffect(() => {
    setBookUrl("https://api.potterdb.com/v1/books");
  }, [setBookUrl]);

  useEffect(() => {
    if (bookApiData) {
      const apiData = bookApiData.data;
      setBookData(apiData);
    }
  }, [bookApiData]);

  useEffect(() => {
    if (bookData) setMovieUrl("https://api.potterdb.com/v1/movies");
  }, [setMovieUrl, bookData]);

  useEffect(() => {
    if (movieApiData) {
      const apiMovieData = movieApiData.data;
      setMovieData(apiMovieData);
    }
  }, [movieApiData]);

  return (
    <>
      <div className="bookData">
        {bookData &&
          bookData.map((book) => (
            <a href={"/book?b=" + book.id} key={book.id}>
              <img
                src={book.attributes.cover}
                alt={book.attributes.slug}
                key={book.id}
              />
            </a>
          ))}
      </div>
      <div className="movieData">
        {movieData &&
          movieData.map((movie) => (
            <a href={"/movie?m=" + movie.id} key={movie.id}>
              <img src={movie.attributes.poster} alt={movie.attributes.slug} />
            </a>
          ))}
      </div>
    </>
  );
}
