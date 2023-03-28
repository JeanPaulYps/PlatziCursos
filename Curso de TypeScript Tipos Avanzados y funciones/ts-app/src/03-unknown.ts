let anyVar: any;

anyVar = true;
anyVar  = undefined;
anyVar = 1;
anyVar = [];
anyVar = {};

anyVar.doSomething();
anyVar.toUpperCase();

let unknownVar: unknown;

unknownVar = true;
unknownVar = undefined;
unknownVar = null;
unknownVar = 1;
unknownVar = [];
unknownVar = {};
unknownVar = "";


unknownVar.doSomething();
unknownVar.toUpperCase();

let palabra: string = unknownVar;

const parse = (str: string): unknown => {
  return JSON.parse(str);
}
