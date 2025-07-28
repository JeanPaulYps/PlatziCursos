import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from 'src/app/services/product.service';
import { generateManyProducts } from 'src/app/models/product.mock';
import { defer, of } from 'rxjs';
import { ValueService } from 'src/app/services/value.service';
import { By } from '@angular/platform-browser';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;
  let valueService: jasmine.SpyObj<ValueService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll']);
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getPromiseValue']);
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent, ProductComponent ],
      providers: [
        {
          provide: ProductsService,
          useValue: productServiceSpy
        },
        {
          provide: ValueService,
          useValue: valueServiceSpy
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
    const products = generateManyProducts(3);
    productsService.getAll.and.returnValue(of(products));
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('tests for all products', () => {
    it('Should return product list from service', () => {
      const products = generateManyProducts(3);
      const previousProducts = component.products.length;
      productsService.getAll.and.returnValue(of(products));
      
      component.getAllProducts();
      fixture.detectChanges();

      expect(component.products.length).toBe(previousProducts + products.length);
      
    });

    it('Should change status loading -> success', fakeAsync(() => {
      const products = generateManyProducts(4);
      productsService.getAll.and.returnValue(defer(()=> Promise.resolve(products)));

      component.getAllProducts();
      fixture.detectChanges();

      expect(component.status).toBe('loading');
      tick();
      expect(component.status).toBe('success')
    }));

    it('Should change status loading -> error', fakeAsync(() => {
      const products = generateManyProducts(4);
      productsService.getAll.and.returnValue(defer(()=> Promise.reject('error')));

      component.getAllProducts();
      fixture.detectChanges();

      expect(component.status).toBe('loading');
      tick();
      expect(component.status).toBe('error')
    }));
  });

describe('test for call Promise', () => {
  it('Should call to promise ', fakeAsync( () => {
    const mockMessage = 'my mock string'
    valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMessage));
    
    component.callPromise();
    tick();
    fixture.detectChanges();
    
    expect(valueService.getPromiseValue).toHaveBeenCalled();
    expect(component.rta).toEqual(mockMessage);
  }));

  const mockMessage = 'my mock string';
  it('Should call the promise on click', fakeAsync( () => {
    valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMessage));
    
    const button = fixture.debugElement.query(By.css('#callPromise'));
    button.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    
    expect(valueService.getPromiseValue).toHaveBeenCalled();
    expect(component.rta).toEqual(mockMessage);
    expect(fixture.debugElement.query(By.css('#rta')).nativeElement.textContent).toBe(mockMessage);
  }));
});
});
