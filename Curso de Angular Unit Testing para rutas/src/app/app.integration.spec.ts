import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { asyncData, clickElement, clickEvent, getText, query, queryAllByDirective, RouterLinkDirectiveStub } from 'src/testing';
import { AppModule } from './app.module';
import { routes } from './app-routing.module';
import { ProductsService } from './services/product.service';
import { generateManyProducts } from './models/product.mock';
import { AuthService } from './services/auth.service';
import { generateOneUser } from './models/user.mock';
import { of } from 'rxjs';

@Component({
  selector: 'app-people',
})
class PeopleComponent {}

@Component({
  selector: 'app-others',
})
class OthersComponent {}

@Component({
  selector: 'app-pico-preview',
})
class PicoPreviewComponent {}

// const routes = [
//   {
//     path: 'pico-preview',
//     component: PicoPreviewComponent,
//   },
//   {
//     path: 'people',
//     component: PeopleComponent,
//   },
//   {
//     path: 'others',
//     component: OthersComponent,
//   },
// ];

fdescribe('App Integration test', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;
  let productServiceSpy: jasmine.SpyObj<ProductsService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUser'])
    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        {
          provide: ProductsService,
          useValue: productServiceSpy
        },
          {
          provide: AuthService,
          useValue: authServiceSpy
        }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    router.initialNavigation();
    tick();
    fixture.detectChanges();
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should exist 7 routerLinks', () => {
    const links = queryAllByDirective(fixture, RouterLinkWithHref);
    expect(links).toHaveSize(7);
  });

  it('Should render Home when clicked without session', fakeAsync( () => {
    const productsMock = generateManyProducts(10);
    const userMock = generateOneUser();
    productServiceSpy.getAll.and.returnValue(asyncData(productsMock));
    authServiceSpy.getUser.and.returnValue(of(userMock));

    clickElement(fixture, 'others-link', true);
    tick();
    fixture.detectChanges(); // Navigation
    tick();
    fixture.detectChanges(); // Ng on init
    expect(router.url).toEqual('/others');
    const element = query(fixture, 'app-others');
    expect(element).toBeTruthy();

    const productsLength = getText(fixture, 'products-length');
    expect(productsLength).toContain(productsMock.length.toString());
  }));  

  it('Should render OthersComponents when clicked without session', fakeAsync( () => {
    authServiceSpy.getUser.and.returnValue(of(null));

    clickElement(fixture, 'others-link', true);
    tick();
    fixture.detectChanges(); // Navigation
    tick();
    fixture.detectChanges(); // Ng on init
    expect(router.url).toEqual('/');
  
  }));  
});
