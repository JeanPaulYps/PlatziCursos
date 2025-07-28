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
    it('should return a string: down', () => {
      person.weight = 40;
      person.height = 1.65;
      const rta = person.calcIMC();
      expect(rta).toEqual('down');
    });

    it('should return string: normal', () => {
      person.weight = 58;
      person.height = 1.65;
      const rta = person.calcIMC();
      expect(rta).toEqual('normal');
    });
    
    it('should return string: overweight', () => {
      person.weight = 70;
      person.height = 1.65;
      const rta = person.calcIMC();
      expect(rta).toEqual('overweight');
    });
    
    it('should return string: overweight level 1', () => {
      person.weight = 80;
      person.height = 1.65;
      const rta = person.calcIMC();
      expect(rta).toEqual('overweight level 1');
    });
    it('should return string: overweight level 2', () => {
      person.weight = 90;
      person.height = 1.65;
      const rta = person.calcIMC();
      expect(rta).toEqual('overweight level 2');
    });

    it('should return string: overweight level 3', () => {
      person.weight = 110;
      person.height = 1.65;
      const rta = person.calcIMC();
      expect(rta).toEqual('overweight level 3');
    });


  })

})
