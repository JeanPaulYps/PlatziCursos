// Nico => [N, i, c, o] => string => string[]
// [N, i, c, o] => Nico => string[] => string

export function parseStr (input: string | string[]): string | string[] {
  if (Array.isArray(input)){
    return input.join("");
  } else {
    return [...input];
  }
}

const rtaArray = parseStr("Nico");
console.log("rtaArray", rtaArray);

const rtaStr = parseStr(["N", "i", "c", "o"]);
console.log("rtaStr", rtaStr);
