// Nico => [N, i, c, o] => string => string[]
// [N, i, c, o] => Nico => string[] => string

function parseStr(input: string): string[];
function parseStr(input: string[]): string;
function parseStr(input: number): boolean;

function parseStr (input: unknown): unknown {
  if (Array.isArray(input)){
    return input.join("");
  } else if (typeof input === "string") {
    return [...input];
  } else if (typeof input === "number") {
    return true;
  }
}

const rtaArray = parseStr("Nico");
console.log("rtaArray", rtaArray);

const rtaStr = parseStr(["N", "i", "c", "o"]);
console.log("rtaStr", rtaStr);

const rtaBoolean = parseStr(12);
