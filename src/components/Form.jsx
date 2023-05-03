// import "./Form.css";

const Form = ({ handleOnChange, currency }) => {
  return (
    <form className="flex flex-col my-4">
      <label htmlFor="price" className="text-lg">
        Precio en {currency}
      </label>
      <input
        id="price"
        type="number"
        inputMode="decimal"
        name="price"
        onChange={handleOnChange}
        className="rounded-lg text-center py-1 text-lg"
        placeholder="500"
        min={0}
      />
    </form>
  );
};

export default Form;
