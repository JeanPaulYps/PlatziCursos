import { TestBed } from "@angular/core/testing";
import { ProductsService } from "./products.service";
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { CreateProductDTO, Product } from "../models/product.model";
import { environment } from "../../environments/environment";
import { faker } from '@faker-js/faker';
import { generateManyProducts, generateOneProduct } from "../models/product.mock";
import { TokenInterceptor } from "../interceptors/token.interceptor";
import { TokenService } from "./token.service";

describe('Product service test', () => { 
  let productService: ProductsService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        TokenService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        }
      ]
    });
    productService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  })

  afterEach(() => {
    httpController.verify();
  })
  it('Should render', () => {
    expect(productService).toBeTruthy();
  });

  describe('test for getAllSimple()', () => { 
    it('Should return a list of products', (done) => {
      const mockData = generateManyProducts(4);
      
      productService.getAllSimple().subscribe(data => {
        expect(data.length).toEqual(mockData.length);
        done();
      });

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url)
      req.flush(mockData);
    });
    it('Should return a list of products', (done) => {
      const mockData = generateManyProducts(4);

      productService.getAllSimple().subscribe(data => {
        expect(data.length).toEqual(mockData.length);
        done();
      });

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url)
      req.flush(mockData);
      httpController.verify();
    });

    it('Should add token to headers', (done) => {
      const mockData = generateManyProducts(4);
      spyOn(tokenService, 'getToken').and.returnValue('123');
      
      productService.getAllSimple().subscribe(data => {
        expect(data.length).toEqual(mockData.length);
        done();
      });
      
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      const headers =req.request.headers;
      expect(headers.get('Authorization')).toEqual('Bearer 123');
      req.flush(mockData);
    });
   })
  describe('test for getAll()', () => { 
    it('Should return a list of products', (done) => {
      const mockData = generateManyProducts(4);
      
      productService.getAll().subscribe(data => {
        expect(data.length).toEqual(mockData.length);
        done();
      });

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url)
      req.flush(mockData);
    });
    it('Should return a list of products with taxes', (done) => {
      const mockData =[ 
        {
          ...generateOneProduct(),
          price: 100,
        },
        {
          ...generateOneProduct(),
          price: 200,
        },
        {
          ...generateOneProduct(),
          price: 0,
        },
        {
          ...generateOneProduct(),
          price: -19,
        }
      ];

      productService.getAll().subscribe(data => {
        expect(data.length).toEqual(mockData.length);
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        done();
      });

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url)
      req.flush(mockData);
      httpController.verify();
    });
    it('Should send query params with limit 10 and offset 2', (done) => {
      const mockData = generateManyProducts(3);
      const limit = 10;
      const offset = 3;

      productService.getAll(limit, offset).subscribe(data => {
        expect(data.length).toEqual(mockData.length);
        done();
      });

      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url)
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
    });
   })

   describe('Test for create', () => {
      it('Should return a new product', (done) => {
        const mockData = generateOneProduct();
        const dto: CreateProductDTO =  {
          title: 'new product',
          price: 100,
          images: ['img'],
          description: "example",
          categoryId: 12
        }
        productService.create({...dto}).subscribe((data) => {
          expect(data).toEqual(mockData);
          const body = req.request.body;
          expect(body).toEqual(dto);
          expect(req.request.method).toEqual('POST');
          done();
        })
        const url = `${environment.API_URL}/api/v1/products`;
        const req = httpController.expectOne(url);
        
        req.flush(mockData);
      })
   });

   describe('Tets for getOne', () => {
      it('Should return a product', (done) => {
        const mockData = generateOneProduct();
        const productId = '1';
      
        productService.getOne(productId).subscribe(data => {
          expect(data).toEqual(mockData);
          done();
        });

        const url = `${environment.API_URL}/api/v1/products/${productId}`;
        const req = httpController.expectOne(url)
        expect(req.request.method).toEqual('GET');
        req.flush(mockData);
      });

      it('Should return the right message when status code is 404', (done) => {
        const productId = '1';
        const messageError = '404 message';
        const mockError = {
          status: 404,
          statusText: messageError,
        }
      
        productService.getOne(productId).subscribe({
          error: (errorMessage) => {
            expect(errorMessage).toBe('El producto no existe');
            done();
          }
        });

        const url = `${environment.API_URL}/api/v1/products/${productId}`;
        const req = httpController.expectOne(url)
        expect(req.request.method).toEqual('GET');
        req.flush(messageError, mockError);
      });
   });
})