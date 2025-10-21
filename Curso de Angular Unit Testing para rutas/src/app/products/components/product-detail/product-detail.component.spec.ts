import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub, asyncData, getText, mockObservable } from 'src/testing';
import { ProductsService } from 'src/app/services/product.service';
import { Location } from '@angular/common';
import { generateOneProduct } from 'src/app/models/product.mock';

fdescribe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let route: ActivatedRouteStub;
  let productService: jasmine.SpyObj<ProductsService>;
  let location: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', ['getOne']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);
    const activatedRoute = new ActivatedRouteStub();
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute
        },
        {
          provide: ProductsService,
          useValue: productServiceSpy
        },
        {
          provide: Location,
          useValue: locationSpy
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;

  });

  it('should render the component', () => {
    const productId = '1';
    route.setParamMap({ id: productId });

    const productMock = {
      ...generateOneProduct(),
      id: productId,
    }

    productService.getOne.and.returnValue(mockObservable(productMock));

    fixture.detectChanges(); //ngOnInit
    expect(component).toBeTruthy();
  });

  it('should show the product in the view', () => {
    const productId = '2';
    route.setParamMap({ id: productId });

    const productMock = {
      ...generateOneProduct(),
      id: productId,
    }

    productService.getOne.and.returnValue(mockObservable(productMock));

    fixture.detectChanges(); //ngOnInit
    const titleText = getText(fixture, 'title');
    const priceText = getText(fixture, 'price');
    expect(titleText).toContain(productMock.title);
    expect(priceText).toContain(productMock.price.toString());
    expect(productService.getOne).toHaveBeenCalledWith(productId);
  });

  it('should show loading state', fakeAsync(() => {
    const productId = '2';
    route.setParamMap({ id: productId });

     const productMock = {
      ...generateOneProduct(),
      id: productId,
    }

    productService.getOne.and.returnValue(asyncData(productMock));

    fixture.detectChanges();

    expect(component.status).toBe('loading'); 
    tick();
    fixture.detectChanges();
    expect(component.status).toBe('success')
  }));

  it('should go back without id params', () => {
    route.setParamMap({});

    location.back.and.callThrough();
    fixture.detectChanges(); //ngOnInit
    expect(location.back).toHaveBeenCalled();
  });


  it('should be type "customer"', () => {
    const productId = '1';
    route.setParamMap({ id: productId });
    route.setQueryParamMap({ type: 'customer'})

    const productMock = {
      ...generateOneProduct(),
      id: productId,
    }

    productService.getOne.and.returnValue(mockObservable(productMock));

    fixture.detectChanges(); //ngOnInit
    expect(component.customerType).toBe('customer');


  });
});
