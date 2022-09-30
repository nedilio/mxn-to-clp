import "./Exchange.css";

const Exchange = ({ currency, flag, country, decimals }) => {
  return (
    <div className="exchange">
      <h2>
        {flag} {country}: {currency.toFixed(decimals)}
      </h2>
    </div>
  );
};

export default Exchange;
