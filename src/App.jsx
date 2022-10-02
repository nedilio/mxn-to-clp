import { useEffect, useState } from "react";
import Exchange from "./components/Exchange";
import "./App.css";
import NavItem from "./components/NavItem";
import Form from "./components/Form";
import Footer from "./components/Footer";
import { getDolarArg, getDolarChile, getCurrency } from "./services";
import { getCountry } from "./services/getLocation";
import Loader from "./components/Loader";

const mexico = { id: "MXN", flag: "🇲🇽" };
const argentina = { id: "ARS", flag: "🇦🇷" };
const countries = { mx: mexico, ar: argentina };

function App() {
  const [dolarChile, setDolarChile] = useState(0);
  const [eurMX, setEurMX] = useState(0);
  const [convertido, setConvertido] = useState({ clp: 0, usd: 0, eur: 0 });
  const [input, setInput] = useState(0);
  const [country, setCountry] = useState(mexico);
  const [loader, setLoader] = useState(true);

  const handleOnChange = (e) => {
    let input = 0;
    if (e.target.value === "") {
      input = 0;
    } else {
      input = parseFloat(e.target.value);
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

  useEffect(() => {
    Promise.all([
      getCurrency("USD", "MXN"),
      getCurrency("EUR", "MXN"),
      getDolarChile(),
      getDolarArg(),
    ]).then(([dolar, euro, precioCl, precioAr]) => {
      setEurMX(euro.toFixed(2));
      setDolarChile(precioCl);
      mexico.dolar = dolar.toFixed(2);
      argentina.dolar = precioAr;
      setLoader(false);
    });

    getCountry().then((country) => {
      console.log(country);
    });
  }, []);

  useEffect(() => {
    if (country.dolar) {
      const usd = input / country.dolar;
      const clp = (input / country.dolar) * dolarChile;
      const eur = input / eurMX;
      setConvertido({ clp, usd, eur });
    }
  }, [input, country]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
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
            1💲 = {country.dolar} {country.id}
          </h5>
          <Form handleOnChange={handleOnChange} currency={country.id}></Form>
          <Exchange
            country="CLP"
            flag="🇨🇱"
            currency={convertido.clp}
            decimals={0}
          ></Exchange>
          <Exchange
            country="USD"
            flag="🇺🇸"
            currency={convertido.usd}
            decimals={2}
          ></Exchange>
          {country.id === "MXN" && (
            <Exchange
              country="EUR"
              flag="🇪🇺"
              currency={convertido.eur}
              decimals={2}
            ></Exchange>
          )}
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
