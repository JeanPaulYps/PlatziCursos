import { Animal, Dog } from "./09-protected";


const animal  = new Animal("Elite");
animal.greetings();

const cheis = new Dog("Cheis", "Nico");
cheis.greeting();
cheis.woof(1);

