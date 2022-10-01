import { useEffect, useState } from "react";
import Exchange from "./components/Exchange";
import "./App.css";
import NavItem from "./components/NavItem";
import Form from "./components/Form";
import Footer from "./components/Footer";
import { getDolarArg, getDolarChile, getCurrency } from "./services";
import { getCountry } from "./services/getLocation";

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
    setCountry(countries[country]);
    const active = document
      .querySelector("li.active")
      .classList.remove("active");
    event.target.classList.add("active");
  };

  const countries = { mx: mexico, ar: argentina };

  useEffect(() => {
    getCurrency("USD", "MXN").then((precioDolar) =>
      setDolarMX(precioDolar.toFixed(2))
    );

    getCurrency("EUR", "MXN").then((precioDolar) =>
      setEurMX(precioDolar.toFixed(2))
    );

    getDolarChile()
      .then((precioDolar) => setDolarChile(precioDolar))
      .catch(() => {
        console.log("Error valor dolar chile, buscare en otra api");
        getCurrency("USD", "CLP").then((res) => setDolarChile(res));
      });

    getDolarArg().then((precioDolar) => setDolarARS(precioDolar));

    getCountry().then((country) => {
      console.log(country);
    });
  }, []);

  useEffect(() => {
    if (country.dolar) {
      setUsd(input / country.dolar);
      setClp((input / country.dolar) * dolarChile);
      setEur(input / eurMX);
    }
  }, [input, country]);
  useEffect(() => {
    setCountry(mexico);
  }, [dolarMX, eurMX]);

  return (
    <div className="App">
      <nav>
        <ul>
          <NavItem
            country="mx"
            flag="🇲🇽"
            currency="mxn"
            className="active"
            handleChangeCountry={handleChangeCountry}
            active
          ></NavItem>
          <NavItem
            country="ar"
            flag="🇦🇷"
            currency="ars"
            handleChangeCountry={handleChangeCountry}
          ></NavItem>
        </ul>
      </nav>
      <h1>Convertir {country.flag} 🔁 </h1>
      <h5 id="rate">
        1💲 = {country.dolar || dolarMX} {country.id}
      </h5>
      <Form handleOnChange={handleOnChange} currency={country.id}></Form>
      <Exchange country="CLP" flag="🇨🇱" currency={clp} decimals={0}></Exchange>
      <Exchange country="USD" flag="🇺🇸" currency={usd} decimals={2}></Exchange>
      {country.id === "MXN" && (
        <Exchange
          country="EUR"
          flag="🇪🇺"
          currency={eur}
          decimals={2}
        ></Exchange>
      )}
      <Footer />
    </div>
  );
}

export default App;
