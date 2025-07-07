import {Person} from "./person.model";

describe('Test for person', () => {
  let person: Person;

  beforeEach(() => {
    person = new Person('Nicolas', 'Molina', 38, 40, 1.65);
  });

  it('should create', () => {
    expect(person.name).toEqual('Nicolas');
    expect(person.lastName).toEqual('Molina');
    expect(person.age).toEqual(38);
  });

  describe('Tests for calcIMC', () => {
    it('should return a string down', () => {
      person.weight = 40;
      person.height = 1.65;
      const rta = person.calcIMC();
      expect(rta).toEqual('down');
    });

    it('should return string: down', () => {
      person.weight = 58;
      person.height = 1.65;
      const rta = person.calcIMC();
      expect(rta).toEqual('normal');
    });
  })

})
