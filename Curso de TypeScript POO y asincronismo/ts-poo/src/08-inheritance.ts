export class Animal {
  constructor(public name: string) {}

  move() {
    console.log('Moving along!');
  }

  greetings() {
    return `Hello, I'm, ${this.name}`;
  }
}

export class Dog extends Animal {
  constructor(name: string, public owner: string) {
    super(name);
  }

  woof(times: number): void {
    for (let index = 0; index < times; index++) {
      console.log('Woof!');
    }
  }
}

const fifi = new Animal('fifi');

fifi.move();
console.log(fifi.greetings());

const cheis = new Dog('cheis', 'Nico');
cheis.move();
console.log(cheis.greetings());
cheis.woof(5);
console.log(cheis.owner);
