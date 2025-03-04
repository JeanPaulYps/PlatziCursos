import { Calculator } from "./calculator"

describe('Test for Divide', () => { 
  it('#divide should return some numbers', () => {
    const calculator = new Calculator();
    expect(calculator.divide(6,3)).toEqual(2);
    expect(calculator.divide(5,2)).toEqual(2.5);
    // expect(calculator.divide(6,3)).toEqual(2);
  })

  it('#divide zero should return null', () => {
    const calculator = new Calculator();
    expect(calculator.divide(6,0)).toBeNull();
    expect(calculator.divide(5,0)).toBeNull();
    // expect(calculator.divide(6,3)).toEqual(2);
  })

  it('Test matchers', () => {
    const name = 'Nicolas';
    let name2;
    expect(name).toBeDefined();
    expect(name2).toBeUndefined();
    expect(1 + 3 == 4).toBeTruthy();
    expect(1 + 1 == 3).toBeFalsy();

    expect(5).toBeLessThan(10);
    expect(20).toBeGreaterThan(10);

    expect('123456').toMatch(/\d/);
    expect(['apple', 'orange', 'pears']).toContain('orange');
  })
})

describe('Test for multiply', () => {
  it('#multiply should return nine', () => {
    const calculator = new Calculator();
    const rta = calculator.multiply(3,3);
    expect(rta).toBe(9);
  })
})