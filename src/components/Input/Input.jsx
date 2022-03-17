import './style.scss';

export default ({ name, label, value, onChange }) => {
  const handleChange = ({ target: { value } }) => {
    onChange(name, value);
  };

  return (
    <div className="input">
      <label className="input__label" htmlFor={name}>
        {label}
      </label>
      <input
        className="input__field"
        id={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
