

import { TestBed } from '@angular/core/testing';
import { MasterService } from './master.service';
import { FakeValueService } from './value-fake.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  

  it('should return my value from injected service', () => {
    const valueService: ValueService = new ValueService();
    let service: MasterService = new MasterService(valueService);
    expect(service.getValue()).toBeTruthy();
  });
  
  it('should return "other value" from fake service', () => {
    const valueService: ValueService = new FakeValueService() as ValueService;
    let service: MasterService = new MasterService(valueService);
    expect(service.getValue()).toBe('fake value');
  });
  
  it('should return "other value" from fake service', () => {
    const fakeService = {getValue: () => 'fake from obj'} as ValueService;
    let service: MasterService = new MasterService(fakeService);
    expect(service.getValue()).toBe('fake from obj');
  })
  
  it('should call to get value from fake service', () => {
    const valueServiceSpy = jasmine.createSpyObj<ValueService>('ValueService', ['getValue']);
    valueServiceSpy.getValue.and.returnValue('fake value')
    let service: MasterService = new MasterService(valueServiceSpy);
    expect(service.getValue()).toBe('fake value');
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  })
  
});

describe('Master service with TestBed', () => {
  let valueService: ValueService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService]
    })
    valueService = TestBed.inject(ValueService);
  })

  it('Should be created', () => {
    expect(valueService).toBeTruthy();
  });

  it('Should get value', () => {
    expect(valueService.getValue()).toBe('my value');
  })

 
})

fdescribe('Testbed using spy', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);
    TestBed.configureTestingModule({
      // Provide both the service-to-test and its (spy) dependency
      providers: [MasterService, { provide: ValueService, useValue: spy }],
    });
    // Inject both the service-to-test and its (spy) dependency
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(
      ValueService
    ) as jasmine.SpyObj<ValueService>;
    valueServiceSpy.getValue.and.returnValue('fake value');
  });

  it('should call to get value from fake service with testBed', () => {
    expect(masterService.getValue()).toBe('fake value');
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  })
})
