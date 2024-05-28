import { useState, useRef } from "react";
import { useApi } from "./useApi";

// https://api.potterdb.com/v1/characters?filter[name_cont]=Weasley
export default function Header() {
  const [results, setResults] = useState([]);
  const searchRef = useRef();
  const resultRef = useRef(null);
  let resultPlaceholder;
  const {
    data: inputApiData,
    error: inputError,
    setUrl: setResultUrl,
  } = useApi();

  function updateInput(event) {
    searchRef.current = event.target.value;
    if (searchRef.current === "") {
      setResults([]);
      return false;
    } else {
      setResultUrl(
        `https://api.potterdb.com/v1/characters?filter[name_cont]=${searchRef.current}`
      );
      update();
    }
  }
  function update() {
    let i = 0;
    setResults([]);
    resultRef.current = inputApiData;
    const myData = resultRef.current.data;
    myData &&
      myData.map((character) => {
        i += 1;
        if (i < 5) setResults((prevVal) => [...prevVal, character]);
        return i >= 5 && results;
      });
    console.log(results);
  }

  return (
    <header>
      <nav>
        <div>
          <label htmlFor="search">browse me</label>
          <input
            type="text"
            id="search"
            ref={searchRef}
            onChange={updateInput}
          />
        </div>
        <div className="resultData">
          {results &&
            results.map((item) => (
              <a key={item.id} href="">
                <div>
                  <img src={item.attributes.image} alt={item.attributes.slug} />
                  <p>{item.attributes.name}</p>
                </div>
              </a>
            ))}
        </div>
      </nav>
    </header>
  );
}
