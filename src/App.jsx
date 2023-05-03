import { useEffect, useState } from "react";
import Exchange from "./components/Exchange";
// import "./App.css";
import NavItem from "./components/NavItem";
import Form from "./components/Form";
import Footer from "./components/Footer";
import {
  getDolarArg,
  getDolarChile,
  getCurrency,
  getCurrencyMx,
} from "./services";
import { getCountry } from "./services/getLocation";
import Loader from "./components/Loader";

function App() {
  const [convertido, setConvertido] = useState({ clp: 0, usd: 0, eur: 0 });
  const [input, setInput] = useState(0);
  const [country, setCountry] = useState({});
  const [loader, setLoader] = useState(true);
  const [countries, setCountries] = useState({});

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
    document.querySelector("li.active").classList.remove("active");
    event.target.classList.add("active");
  };

  useEffect(() => {
    Promise.all([
      getCurrencyMx("MXN"),
      getCurrencyMx("USD"),
      getDolarArg(),
    ]).then(([currencyMx, currencyUs, dolarBlueAr]) => {
      const mexico = { id: "MXN", flag: "🇲🇽", ...currencyMx, decimals: 2 };
      const argentina = {
        id: "ARS",
        flag: "🇦🇷",
        USD: currencyUs.USD / dolarBlueAr,
        EUR: currencyUs.EUR / dolarBlueAr,
        CLP: currencyUs.CLP / dolarBlueAr,
        decimals: 0,
      };
      const paises = { mx: mexico, ar: argentina };
      console.log(paises);
      setCountries(paises);
      setCountry(mexico);
      setTimeout(() => {
        setLoader(false);
      }, 1250);
    });

    getCountry().then((country) => {
      // console.log(country);
    });
  }, []);

  useEffect(() => {
    if (country.USD) {
      const usd = input * country.USD;
      const clp = input * country.CLP;
      const eur = input * country.EUR;
      setConvertido({ clp, usd, eur });
    }
  }, [input, country]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center h-screen bg-emerald-100 text-emerald-800 px-4">
          <div className="border p-4 rounded-xl border-gray-400 shadow-md pb-0 text-center w-full max-w-lg">
            <nav className="mb-4">
              <ul className="flex justify-around">
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
            <h1 className="font-bold text-2xl ">Convertir {country.flag} 🔁</h1>
            <h5 id="rate" className="font-semibold">
              1💲 = {(1 / country.USD).toFixed(country.decimals)} {country.id}{" "}
            </h5>
            <Form handleOnChange={handleOnChange} currency={country.id}></Form>
            <section className="flex flex-col gap-y-1 mt-2">
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
              <Exchange
                country="EUR"
                flag="🇪🇺"
                currency={convertido.eur}
                decimals={2}
              ></Exchange>
            </section>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
