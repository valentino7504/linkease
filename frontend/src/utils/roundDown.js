const roundDownToOneDP = num => {
  const rounded = Math.floor(num * 10) / 10;
  return Number.isInteger(rounded) ? rounded : parseFloat(rounded.toFixed(1));
};

export default roundDownToOneDP;
