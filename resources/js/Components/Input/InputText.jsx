import '../../../css/input.css';

export default function InputText({ type = 'text', value, onChange, placeholder, required = false, label, name, disabled }) {
  return (
    <div className="inputText">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}
