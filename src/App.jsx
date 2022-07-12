import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [dolarChile, setDolarChile] = useState(0);
  const [dolarBlueArg, setDolarBlueArg] = useState(0);
  const [clp, setClp] = useState(0);
  const [usd, setUsd] = useState(0);
  const [ars, setArs] = useState(0);
  const [dolarArg, setDolarArg] = useState(245);

  const handleOnChange = (e) => {
    let arsInput = 0;
    if (e.target.value === "") {
      arsInput = 0;
    } else {
      arsInput = parseInt(e.target.value);
    }
    setUsd(arsInput / dolarArg);
    setClp((arsInput / dolarArg) * dolarChile);
    setArs(arsInput);
  };

  const handleChangeRate = (event, rate) => {
    setDolarArg(rate);
    const active = document
      .querySelector("li.active")
      .classList.remove("active");
    event.target.classList.add("active");
  };

  useEffect(() => {
    setUsd(ars / dolarArg);
    setClp((ars / dolarArg) * dolarChile);
  }, [dolarArg]);

  useEffect(() => {
    // fetch("https://mindicador.cl/api/")
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setDolarChile(res.dolar.valor);
    //     // console.log(res);
    //   });
    fetch("https://api.bluelytics.com.ar/v2/latest")
      .then((res) => res.json())
      .then((res) => setDolarBlueArg(res.blue.value_buy));

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
          <li
            id="cambiado"
            onClick={() => handleChangeRate(event, 245)}
            className="active"
          >
            1💲 = 245 ARS
          </li>
          <li id="blue" onClick={() => handleChangeRate(event, dolarBlueArg)}>
            1💲 = {dolarBlueArg} ARS
          </li>
        </ul>
      </nav>
      <h1>Convertir 🇦🇷 🔁 🇨🇱</h1>
      <label htmlFor="ars">Precio en ARS 🇦🇷</label>
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
          <p>by @nedilio</p>
        </a>
      </footer>
    </div>
  );
}

export default App;
