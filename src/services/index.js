import axios from "axios";

export const getDolarArg = () => {
  return axios
    .get("https://api.bluelytics.com.ar/v2/latest")
    .then((res) => {
      return res.data;
    })
    .then((res) => res.blue.value_buy);
};

export const getCurrency = (from, to) => {
  const options = {
    method: "GET",
    url: "https://currency-exchange.p.rapidapi.com/exchange",
    params: { from, to, q: "1.0" },
    headers: {
      "X-RapidAPI-Key": "f5b8bf79e4msh25787ede94720aep17173ejsne2e841f052f2",
      "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
    },
  };
  return axios
    .request(options)
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getDolarChile = () => {
  return axios
    .get(
      "https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar/2022?apikey=74480963fcc3674c7781f739601f8dcee31aef6b&formato=json"
    )
    .then((res) => {
      const { data } = res;
      const last = data.Dolares.at(-1);
      return parseInt(last.Valor.slice(","));
    });
};
