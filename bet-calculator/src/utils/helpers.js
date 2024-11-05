const convertToDecimal = (str) => {
  if(typeof str  === "string" && str?.includes(',') ) {
    const number = parseFloat( str.replace( /,/g, '.' ) );
    return number.toFixed(2)
  }
  return str;
}


export {
  convertToDecimal,
}
