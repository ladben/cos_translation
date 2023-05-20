import './CreateEntryInput.css';

const CreateEntryInput = (props) => {
  const { className, inputName, label, placeholder, changeHandler, clickHandler } = props;

  return (
    <div className={className}>
      <label htmlFor={inputName}>{label}</label>
      <input
        name={inputName}
        placeholder={placeholder}
        onChange={changeHandler}
        onClick={clickHandler}
      />
    </div>
  );
}
 
export default CreateEntryInput;