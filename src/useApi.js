import { useState, useEffect, useRef } from "react";

export function useApi() {
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const exRef = useRef();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.error("Error:", response.status);
          return;
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err);
      }
    }
    if (url.length > 0) fetchData();
  }, [url]);

  return { data, error, setUrl };
}
