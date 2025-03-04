// import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(ValueService);
  // });

  beforeEach(() => {
    service = new ValueService();
  })

  it('should be created', () => {
    service = new ValueService();
    expect(service).toBeTruthy();
  });

  describe("test for getValue", () => {
    it("Should return 'my value'", () => {
      expect(service.getValue()).toBe("my value");
    })
  })
  describe("test for setValue", () => {
    it("Should change the value", () => {
      expect(service.getValue()).toBe("my value");
      service.setValue('change')
      expect(service.getValue()).toBe('change');
    })
  })
  
  describe("test for getPromiseValue", () => {
    it("Should promise value from promiseValue", async () => {
      const value = await service.getPromisedValue();
      console.log("My value", value);
      expect(value).toBe("my value");

      // doneFn();
      
      // expect(service.getValue()).toBe("my value");
      // service.setValue('change')
      // expect(service.getValue()).toBe('change');
    })
  })
  describe("test for getObservableValue", () => {
    it("Should return value from myPromiseValue", async () => {
      service.getObservableValue().subscribe(value => {
        expect(value).toBe("my value");
       
      })
      // expect(service.getValue()).toBe("my value");
      // service.setValue('change')
      // expect(service.getValue()).toBe('change');
    })
  })
});
