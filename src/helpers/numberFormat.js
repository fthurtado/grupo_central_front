function numberFormat(number) {
  if (number === undefined) return '';
  return (number).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1.');
}

export default numberFormat;
