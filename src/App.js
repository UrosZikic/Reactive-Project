import { useEffect, useState, useRef } from "react";

export default function App() {
  const [data, setData] = useState("");
  const exRef = useRef();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.potterdb.com/v1/movies");
      if (!response.ok) {
        console.error("Error:", response.status);
        return;
      }
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData);
    }
    fetchData();
  }, []);

  return <div></div>;
}
