import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/testing';
import { ProductsService } from 'src/app/services/product.service';
import { Location } from '@angular/common';

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

    const productId = 1;
    route.setParamMap({id: productId}) as any; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
