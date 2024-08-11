import PropTypes from "prop-types";

const Form = ({ type = "text", label, placeholder, name, value, onChange }) => {
  return (
    <div>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        name={name}
        type={type}
        className="form-control"
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

Form.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};

export default Form;
