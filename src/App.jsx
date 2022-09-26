import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [dolarChile, setDolarChile] = useState(0);
  const [dolarMX, setDolarMX] = useState(0);
  const [clp, setClp] = useState(0);
  const [usd, setUsd] = useState(0);
  const [mxn, setMxn] = useState(0);

  const handleOnChange = (e) => {
    let mxInput = 0;
    if (e.target.value === "") {
      mxInput = 0;
    } else {
      mxInput = parseInt(e.target.value);
    }
    setUsd(mxInput / dolarMX);
    setClp((mxInput / dolarMX) * dolarChile);
    setMxn(mxInput);
  };

  useEffect(() => {

      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'f5b8bf79e4msh25787ede94720aep17173ejsne2e841f052f2',
          'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
        }
      };
      
      fetch('https://currency-exchange.p.rapidapi.com/exchange?from=USD&to=MXN&q=1.0', options)
        .then(response => response.json())
        .then(response => setDolarMX(response))
        .catch(err => console.error(err));

    fetch(
      "https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar?apikey=74480963fcc3674c7781f739601f8dcee31aef6b&formato=json"
    )
      .then((res) => res.json())
      .then((res) => setDolarChile(parseInt(res.Dolares[0].Valor)));
  }, []);

  return (
    <div className="App">
      <nav>
        <ul>
          <li id="blue">
            1💲 = {dolarMX.toFixed(2)} MXN
          </li>
        </ul>
      </nav>
      <h1>Convertir 🌮 🔁 🌶</h1>
      <label htmlFor="ars">Precio en MXN</label>
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
