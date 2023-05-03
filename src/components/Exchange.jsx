// import "./Exchange.css";

const Exchange = ({ currency, flag, country, decimals }) => {
  return (
    <h2 className="font-bold text-xl">
      {flag} {country}: {currency ? currency.toFixed(decimals) : 0}
    </h2>
  );
};

export default Exchange;
