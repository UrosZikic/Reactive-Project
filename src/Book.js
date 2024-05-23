import { useApi } from "./useApi";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Movie.css";

export default function Book() {
  const [book, setBook] = useState();
  // utilize customhook
  const { data: bookApiData, error: bookError, setUrl: setBookUrl } = useApi();
  // isolate the specific URI parameter
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("b");

  useEffect(() => {
    setBookUrl("https://api.potterdb.com/v1/books/" + id);
    bookApiData && setBook(Object.entries(bookApiData.data.attributes));
  }, [id, setBookUrl, bookApiData]);

  if (book) {
    console.log(book);

    book.map((item, id) => console.log(item[0], item[1]));
  }
  return (
    <>
      {book && (
        <main>
          <h1 className="content-heading">{book[7][1]}</h1>
          <section className="content-section">
            <div>
              <img src={book[2][1]} alt={book[0][1]} />
              <ul>
                {book.map((item, id) => (
                  <li
                    key={id}
                    style={{
                      display:
                        item[0] !== "slug"
                          ? item[0] !== "cover"
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
              <p>{book[6][1]}</p>
            </div>
          </section>
        </main>
      )}
    </>
  );
}
