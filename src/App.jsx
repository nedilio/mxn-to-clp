import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [dolarChile, setDolarChile] = useState(0);
  const [clp, setClp] = useState(0);

  const handleOnChange = (e) => {
    const ars = e.target.value;
    const usd = ars / 245;
    setClp(usd * dolarChile);
    console.log(clp);
  };

  useEffect(() => {
    fetch("https://mindicador.cl/api/")
      .then((res) => res.json())
      .then((res) => setDolarChile(res.dolar.valor));
  }, []);
  console.log(dolarChile);

  return (
    <div className="App">
      <h1>Convertir 🇦🇷 🔁 🇨🇱</h1>
      <label htmlFor="ars">Precio en ARS 🇦🇷</label>
      <input type="number" name="ars" onChange={handleOnChange} />
      <h2>🇨🇱 CLP: {clp.toFixed(0)}</h2>
      <h2>🇺🇸 USD: {(clp / dolarChile).toFixed(2)}</h2>
    </div>
  );
}

export default App;
