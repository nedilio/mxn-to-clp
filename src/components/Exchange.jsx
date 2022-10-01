import "./Exchange.css";

const Exchange = ({ currency, flag, country, decimals }) => {
  return (
    <div className="exchange">
      <h2>
        {flag} {country}: {currency ? currency.toFixed(decimals) : 0}
      </h2>
    </div>
  );
};

export default Exchange;
