import { useEffect, useState } from "react";
import Exchange from "./components/Exchange";
import "./App.css";
import NavItem from "./components/NavItem";
import Form from "./components/Form";
import Footer from "./components/Footer";

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
      .then((res) => setDolarChile(parseInt(res.Dolares[0].Valor)))
      .catch(
        fetch(
          "https://currency-exchange.p.rapidapi.com/exchange?from=USD&to=CLP&q=1",
          options
        )
          .then((response) => response.json())
          .then((response) => setDolarChile(response.toFixed(2)))
          .catch((err) => console.error(err))
      );

    fetch("https://api.bluelytics.com.ar/v2/latest")
      .then((res) => res.json())
      .then((res) => setDolarARS(res.blue.value_buy));
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
