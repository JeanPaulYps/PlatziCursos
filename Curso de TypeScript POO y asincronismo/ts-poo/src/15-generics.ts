
function getValue<myType>(value: myType) {
  const array: myType[] = [value]
  return value;
}

getValue<number>(12).toFixed();
getValue("12").toLowerCase()
