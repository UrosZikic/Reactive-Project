import { useState, useEffect } from "react";

export default function App() {
  const [currencies, setCurrencies] = useState([]);
  const [convertFrom, setConvertFrom] = useState("");
  const [convertTo, setConvertTo] = useState("");
  const [qnt, setQnt] = useState("");
  const [convertedCur, setConvertedCur] = useState("");

  function handleQnt(e) {
    // const validateQnt = !isNaN(e.taget.value) && parseInt(e.target.value);
    setQnt(parseInt(e.target.value));
  }

  function handleConvertFrom(e) {
    setConvertFrom(e.target.value);
  }

  function handleConvertTo(e) {
    setConvertTo(e.target.value);
  }

  const host = "api.frankfurter.app";
  useEffect(() => {
    async function currencyList() {
      const res = await fetch(`https://${host}/currencies`);
      if (!res.ok) {
        console.error(res.status);
        return;
      }
      const jsonData = await res.json();
      const currencyList = [];
      for (let [key, value] of Object.entries(jsonData)) {
        currencyList.push(key);
      }
      if (currencyList.length === 31) setCurrencies(currencyList);
    }
    currencyList();
  }, []);

  useEffect(() => {
    async function currencyConversion() {
      if (!isNaN(qnt) && !!convertFrom && !!convertTo) {
        const validatedQnt = isNaN(qnt) ? 1 : qnt;
        const res = await fetch(
          `https://${host}/latest?amount=${validatedQnt}&from=${convertFrom}&to=${convertTo}`
        );
        if (!res.ok) {
          console.error(res.status);
          return;
        }
        const jsonData = await res.json();
        for (let value of Object.values(jsonData.rates)) {
          const validateValue = parseFloat(value);
          setConvertedCur(validateValue.toFixed(2));
        }
      }
    }

    currencyConversion();
  }, [qnt, convertFrom, convertTo]);
  return (
    <div>
      <div>
        <label htmlFor="qnt"></label>
        <input type="number" id="qnt" value={qnt} onChange={handleQnt} />
      </div>
      <select name="" id="" onChange={handleConvertFrom}>
        <option value="default">choose currency</option>

        {currencies.map((val, i) => (
          <option value={val} key={val}>
            {val}
          </option>
        ))}
      </select>
      <select name="" id="" onChange={handleConvertTo}>
        <option value="default">choose currency</option>
        {currencies.map((val, i) => (
          <option value={val} key={val}>
            {val}
          </option>
        ))}
      </select>
      <p>
        conversion result:
        {!isNaN(qnt)
          ? convertFrom.length > 1
            ? convertTo.length > 1
              ? `${qnt} ${convertFrom} is ${convertedCur} ${convertTo}`
              : ``
            : ""
          : ""}
      </p>
    </div>
  );
}
