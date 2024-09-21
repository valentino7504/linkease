const handleButtonTouch = (e) => e.currentTarget.classList.toggle('tap-btn');
const Button = ({ text, handleClick, extraStyles, disabled }) => {
  return (
    <button
      className={'bg-pri p-2 sm:p-4 rounded-lg lg:w-1/6 enabled:lg:hover:bg-black disabled:text-gray-700 ' +
        'enabled:sm:hover:text-white font-bold text-lg min-[1024px]:p-2 min-[1065px]:p-4 max-[468px]:p-2 ' +
        `${extraStyles ? extraStyles : ''}`
      }
      onClick={handleClick}
      onTouchStart={handleButtonTouch}
      onTouchEnd={handleButtonTouch}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
