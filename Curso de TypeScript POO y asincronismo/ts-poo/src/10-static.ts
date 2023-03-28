console.log("Math.PI",Math.PI);

class MyMath {
  static readonly PI = 3.14;

  static max(...numbers: number[]) {
    return numbers.reduce((max, item) => max >= item ? max : item, -Infinity);
  }
}

console.log("MyMath.PI", MyMath.PI);
console.log("MyMath.max", MyMath.max());

console.log( Math.max() );
