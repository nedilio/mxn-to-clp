import "./NavItem.css";

const NavItem = ({ active, country, flag, currency, handleChangeCountry }) => {
  return (
    <li
      className={active && "active"}
      id={currency}
      onClick={() => handleChangeCountry(event, country)}
    >
      {flag}
    </li>
  );
};

export default NavItem;
