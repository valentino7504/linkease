import Button from './Button';

const InputActionBox = ({
  placeholderText,
  inputClass,
  inputValue,
  buttonText,
  handleInputChange,
  handleClick,
  isButtonDisabled,
  buttonExtraStyles,
  containerStyles
}) => {
  return (
    <div className={containerStyles}>
      <input type='text' placeholder={placeholderText} className={inputClass}
        onChange={handleInputChange} value={inputValue}
      />
      <Button
        text={buttonText}
        handleClick={handleClick}
        disabled={isButtonDisabled}
        extraStyles={buttonExtraStyles}
      />
    </div>
  );
};

export default InputActionBox;
