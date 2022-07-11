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

  useEffect(() => {
    setUsd(ars / dolarArg);
    setClp((ars / dolarArg) * dolarChile);
  }, [dolarArg]);

  useEffect(() => {
    fetch("https://mindicador.cl/api/")
      .then((res) => res.json())
      .then((res) => setDolarChile(res.dolar.valor));
    fetch("https://api.bluelytics.com.ar/v2/latest")
      .then((res) => res.json())
      .then((res) => setDolarBlueArg(res.blue.value_buy));
  }, []);

  return (
    <div className="App">
      <nav>
        <ul>
          <li onClick={() => setDolarArg(245)} className="active">
            1$ = 245 ARS
          </li>
          {/* <li onClick={() => setDolarArg(dolarBlueArg)}>
            1$ = {dolarBlueArg} ARS
          </li> */}
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
      <h2>🇨🇱 CLP: {clp.toFixed(0)}</h2>
      <h2>🇺🇸 USD: {usd.toFixed(2)}</h2>
      <footer>by Nedilio 2022</footer>
    </div>
  );
}

export default App;
