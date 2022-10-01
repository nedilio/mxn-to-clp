import axios from "axios";

export const getCountry = () => {
  return axios
    .get("https://ipapi.co/json/")
    .then((response) => response.data.country);
};

//   { "ip": "148.246.189.174",
//   "network": "148.246.188.0/23",
//   "version": "IPv4",
//   "city": "San Luis Potosí City",
//   "region": "San Luis Potosí",
//   "region_code": "SLP",
//   "country": "MX",
//   "country_name": "Mexico",
//   "country_code": "MX",
//   "country_code_iso3": "MEX",
//   "country_capital": "Mexico City",
//   "country_tld": ".mx",
//   "continent_code": "NA",
//   "in_eu": false,
//   "postal": "78230",
//   "latitude": 22.1638,
//   "longitude": -100.9818,
//   "timezone": "America/Mexico_City",
//   "utc_offset": "-0500",
//   "country_calling_code": "+52",
//   "currency": "MXN",
//   "currency_name": "Peso",
//   "languages": "es-MX",
//   "country_area": 1972550.0,
//   "country_population": 126190788,
//   "asn": "AS28537",
//   "org": "Mexico Red de Telecomunicaciones,
//   S. de R.L. de C.V." }
