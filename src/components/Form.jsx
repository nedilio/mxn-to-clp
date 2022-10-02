import "./Form.css";

const Form = ({ handleOnChange, currency }) => {
  return (
    <form action="">
      <label htmlFor="price">Precio en {currency}</label>
      <input
        id="price"
        type="number"
        inputMode="decimal"
        name="price"
        onChange={handleOnChange}
      />
    </form>
  );
};

export default Form;
