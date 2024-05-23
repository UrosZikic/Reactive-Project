import { useApi } from "./useApi";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Movie.css";

export default function Movie() {
  const [movie, setMovie] = useState();
  // utilize customhook
  const {
    data: movieApiData,
    error: movieError,
    setUrl: setMovieUrl,
  } = useApi();
  // isolate the specific URI parameter
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("m");

  useEffect(() => {
    setMovieUrl("https://api.potterdb.com/v1/movies/" + id);
    movieApiData && setMovie(Object.entries(movieApiData.data.attributes));
  }, [id, setMovieUrl, movieApiData]);

  if (movie) {
    movie.map((item, id) => console.log(item[0], item[1]));
  }
  return (
    <>
      {movie && (
        <main>
          <h1 className="content-heading">{movie[15][1]}</h1>
          <section className="content-section">
            <div>
              <img src={movie[8][1]} alt={movie[0][1]} />
              <ul>
                {movie.map((item, id) => (
                  <li
                    key={id}
                    style={{
                      display:
                        item[0] !== "slug"
                          ? item[0] !== "poster"
                            ? item[0] !== "summary"
                              ? "block"
                              : "none"
                            : "none"
                          : "none",
                    }}
                  >
                    {item[0]}: {item[1]}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p>{movie[14][1]}</p>
            </div>
          </section>
        </main>
      )}
    </>
  );
}
