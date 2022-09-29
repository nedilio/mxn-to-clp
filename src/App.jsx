import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [dolarMX, setDolarMX] = useState(0);
  const [dolarARS, setDolarARS] = useState(0);

  const mexico = { id: "MXN", flag: "🇲🇽", dolar: dolarMX };
  const argentina = { id: "ARS", flag: "🇦🇷", dolar: dolarARS };

  const [dolarChile, setDolarChile] = useState(0);
  const [eurMX, setEurMX] = useState(0);
  const [clp, setClp] = useState(0);
  const [usd, setUsd] = useState(0);
  const [eur, setEur] = useState(0);
  const [input, setInput] = useState(0);
  const [country, setCountry] = useState(argentina);

  const handleOnChange = (e) => {
    let input = 0;
    if (e.target.value === "") {
      input = 0;
    } else {
      input = parseInt(e.target.value);
    }
    setInput(input);
  };

  const handleChangeCountry = (event, country) => {
    // setDolarArSsetDolarArS(rate);
    setCountry(countries[country]);
    const active = document
      .querySelector("li.active")
      .classList.remove("active");
    event.target.classList.add("active");
  };

  const countries = { mx: mexico, ar: argentina };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "f5b8bf79e4msh25787ede94720aep17173ejsne2e841f052f2",
        "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
      },
    };

    fetch(
      "https://currency-exchange.p.rapidapi.com/exchange?from=USD&to=MXN&q=1",
      options
    )
      .then((response) => response.json())
      .then((response) => setDolarMX(response.toFixed(2)))
      .catch((err) => console.error(err));

    fetch(
      "https://currency-exchange.p.rapidapi.com/exchange?from=EUR&to=MXN&q=1",
      options
    )
      .then((response) => response.json())
      .then((response) => setEurMX(response))
      .catch((err) => console.error(err));

    fetch(
      "https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar?apikey=74480963fcc3674c7781f739601f8dcee31aef6b&formato=json"
    )
      .then((res) => res.json())
      .then((res) => setDolarChile(parseInt(res.Dolares[0].Valor)));

    fetch("https://api.bluelytics.com.ar/v2/latest")
      .then((res) => res.json())
      .then((res) => setDolarARS(res.blue.value_buy));
  }, []);

  useEffect(() => {
    console.log("cambia input");
    console.log(country.dolar);
    if (country.dolar) {
      setUsd(input / country.dolar);
      setClp((input / country.dolar) * dolarChile);
      setEur(input / eurMX);
    }
  }, [input, country]);
  useEffect(() => {
    setCountry(mexico);
    console.log(countries);
  }, [dolarMX, eurMX]);

  return (
    <div className="App">
      <nav>
        <ul>
          <li
            id="mxn"
            className="active"
            onClick={() => handleChangeCountry(event, "mx")}
          >
            🇲🇽
          </li>
          <li
            id="ars"
            className=""
            onClick={() => handleChangeCountry(event, "ar")}
          >
            🇦🇷
          </li>
        </ul>
      </nav>
      <h1>Convertir {country.flag} 🔁 🇨🇱</h1>
      <h5 id="blue">
        1💲 = {country.dolar || dolarMX} {country.id}
      </h5>
      <label htmlFor="ars">Precio en {country.id}</label>
      <input
        type="number"
        inputMode="decimal"
        name="ars"
        onChange={handleOnChange}
      />
      <div>
        <h2>🇨🇱 CLP: {clp.toFixed(0)}</h2>
        <p>1💲 = {dolarChile} CLP</p>
      </div>
      <h2>🇺🇸 USD: {usd.toFixed(2)}</h2>
      {country.id === "MXN" && <h2>🇪🇺 EUR: {eur.toFixed(2)}</h2>}
      <footer>
        <a
          href="https://github.com/nedilio"
          target="_blank"
          rel="noopener noreferrer"
        >
          by @nedilio
        </a>
      </footer>
    </div>
  );
}

export default App;
